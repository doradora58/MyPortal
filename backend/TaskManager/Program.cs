using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<TaskStore>();

var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));
app.MapGet("/Tasks", async (TaskStore store) => Results.Ok(await store.GetAllAsync()));
app.MapGet("/Tasks/{id:int}", async (int id, TaskStore store) =>
{
    var task = await store.GetByIdAsync(id);
    return task is null ? Results.NotFound() : Results.Ok(task);
});
app.MapPost("/Tasks", async (TaskInput input, TaskStore store) =>
{
    var validationError = Validate(input);
    if (validationError is not null) return Results.BadRequest(validationError);

    var task = await store.CreateAsync(input);
    return Results.Created($"/Tasks/{task.Id}", task);
});
app.MapPut("/Tasks/{id:int}", async (int id, TaskInput input, TaskStore store) =>
{
    var validationError = Validate(input);
    if (validationError is not null) return Results.BadRequest(validationError);

    var task = await store.UpdateAsync(id, input);
    return task is null ? Results.NotFound() : Results.Ok(task);
});
app.MapDelete("/Tasks/{id:int}", async (int id, TaskStore store) =>
{
    var task = await store.DeleteAsync(id);
    return task is null ? Results.NotFound() : Results.Ok(task);
});

app.Run();

static string? Validate(TaskInput input)
{
    if (string.IsNullOrWhiteSpace(input.Title)) return "タスク名を入力してください。";
    if (input.Title.Length > 120) return "タスク名は120文字以内で入力してください。";
    if (input.Description?.Length > 1000) return "説明は1000文字以内で入力してください。";
    if (input.AssignedTo?.Length > 80) return "担当者は80文字以内で入力してください。";
    if (input.PlannedTerm.EndDate.Date < input.PlannedTerm.StartDate.Date)
        return "終了日は開始日以降の日付を指定してください。";
    return null;
}

public sealed record PlannedTerm(DateTime StartDate, DateTime EndDate);

public sealed record GanttTask(
    int Id,
    string Title,
    string? Description,
    string? AssignedTo,
    string Status,
    PlannedTerm PlannedTerm);

public sealed record TaskInput(
    string Title,
    string? Description,
    string? AssignedTo,
    string Status,
    PlannedTerm PlannedTerm);

public sealed class TaskStore
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true,
    };

    private readonly SemaphoreSlim _mutex = new(1, 1);
    private readonly string _filePath;
    private List<GanttTask> _tasks;

    public TaskStore(IConfiguration configuration)
    {
        _filePath = configuration["TASKS_FILE"] ?? "/data/tasks.json";
        var directory = Path.GetDirectoryName(_filePath);
        if (!string.IsNullOrEmpty(directory)) Directory.CreateDirectory(directory);

        if (File.Exists(_filePath))
        {
            _tasks = JsonSerializer.Deserialize<List<GanttTask>>(File.ReadAllText(_filePath), JsonOptions)
                ?? throw new InvalidDataException($"Task data in '{_filePath}' is empty or invalid.");
        }
        else
        {
            _tasks = CreateSeedTasks();
            Save();
        }
    }

    public async Task<IReadOnlyList<GanttTask>> GetAllAsync()
    {
        await _mutex.WaitAsync();
        try
        {
            return _tasks.OrderBy(task => task.PlannedTerm.StartDate).ToArray();
        }
        finally
        {
            _mutex.Release();
        }
    }

    public async Task<GanttTask?> GetByIdAsync(int id)
    {
        await _mutex.WaitAsync();
        try
        {
            return _tasks.FirstOrDefault(task => task.Id == id);
        }
        finally
        {
            _mutex.Release();
        }
    }

    public async Task<GanttTask> CreateAsync(TaskInput input)
    {
        await _mutex.WaitAsync();
        try
        {
            var task = new GanttTask(
                _tasks.Count == 0 ? 1 : _tasks.Max(item => item.Id) + 1,
                input.Title.Trim(),
                Normalize(input.Description),
                Normalize(input.AssignedTo),
                input.Status,
                input.PlannedTerm);
            _tasks.Add(task);
            Save();
            return task;
        }
        finally
        {
            _mutex.Release();
        }
    }

    public async Task<GanttTask?> UpdateAsync(int id, TaskInput input)
    {
        await _mutex.WaitAsync();
        try
        {
            var index = _tasks.FindIndex(task => task.Id == id);
            if (index < 0) return null;

            var task = new GanttTask(
                id,
                input.Title.Trim(),
                Normalize(input.Description),
                Normalize(input.AssignedTo),
                input.Status,
                input.PlannedTerm);
            _tasks[index] = task;
            Save();
            return task;
        }
        finally
        {
            _mutex.Release();
        }
    }

    public async Task<GanttTask?> DeleteAsync(int id)
    {
        await _mutex.WaitAsync();
        try
        {
            var task = _tasks.FirstOrDefault(item => item.Id == id);
            if (task is null) return null;
            _tasks.Remove(task);
            Save();
            return task;
        }
        finally
        {
            _mutex.Release();
        }
    }

    private void Save()
    {
        var temporaryPath = $"{_filePath}.tmp";
        File.WriteAllText(temporaryPath, JsonSerializer.Serialize(_tasks, JsonOptions));
        File.Move(temporaryPath, _filePath, overwrite: true);
    }

    private static string? Normalize(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value.Trim();

    private static List<GanttTask> CreateSeedTasks()
    {
        var today = DateTime.Today;
        return
        [
            Seed(1, "プロジェクト計画", "スコープと進め方を整理する", "Planning", today.AddDays(-4), today.AddDays(2), "Completed"),
            Seed(2, "要件整理", "関係者の要望と優先度をまとめる", "Planning", today.AddDays(-1), today.AddDays(5), "Active"),
            Seed(3, "画面設計", "主要画面の構成と導線を設計する", "Design", today.AddDays(3), today.AddDays(11), "New"),
            Seed(4, "API実装", "タスク管理APIを実装する", "Development", today.AddDays(8), today.AddDays(20), "New"),
            Seed(5, "動作確認", "主要な操作と表示を確認する", "QA", today.AddDays(18), today.AddDays(25), "Pending"),
        ];
    }

    private static GanttTask Seed(int id, string title, string description, string assignedTo,
        DateTime start, DateTime end, string status) =>
        new(id, title, description, assignedTo, status, new PlannedTerm(start, end));
}
