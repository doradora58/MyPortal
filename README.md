# MyPortal

MyPortal brings the portal, apps, and project tools together behind one Nginx
service.

## Run with Docker Compose

From the repository root, build and start the services:

```sh
docker compose up -d --build
```

The portal is available at `http://localhost:8080/`. The Gantt chart is at
`http://localhost:8080/gantt-chart/`, and Money Dashboard is at
`http://localhost:8080/money-dashboard/`. Both applications are routed through
Nginx and are not exposed as separate host ports.

Gantt tasks are stored in the `gantt-data` Docker volume and remain available
when the services are recreated. `docker compose down` preserves named volumes.
Use `docker compose down -v` only when intentionally deleting the persisted
task data as well as the services. A new data volume starts with a small sample
schedule that can be edited or deleted from the chart. Money Dashboard runs its
investment estimate in the browser and does not require a database.

The applications run with Docker Compose; Kubernetes is not required.
