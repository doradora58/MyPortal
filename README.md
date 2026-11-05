# MyPortal

MyPortal brings the portal, apps, and project tools together behind one Nginx
service.

## Run with Docker Compose

From the repository root, build and start the services:

```sh
docker compose up -d --build
```

The portal is available at `http://localhost:8080/`. Open the Gantt chart at
`http://localhost:8080/gantt-chart/`; its task API is routed through Nginx and
is not exposed as a separate host port.

Gantt tasks are stored in the `gantt-data` Docker volume and remain available
when the services are recreated. `docker compose down` preserves named volumes.
Use `docker compose down -v` only when intentionally deleting the persisted
task data as well as the services. A new data volume starts with a small sample
schedule that can be edited or deleted from the chart.
