<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <h1 align="center">NestJS Architecture & Advanced Patterns</h1>
</p>

## 1. Hexagonal Architecture (Ports and Adapters)

Folder structure per bounded context:
- Application:
  - Contain the application services, modules, facades, handlers and commands.
  - This folder represents the application layer.
  - It will communicate with the data access components, message brokers and other external systems through interfaces or ports.
- Domain:
  - Contain the domain models, value objects, domain events, factories and other domain specific components.
  - This folder represents the domain layer.
- Infrastructure:
  - Contain the data access components, message brokers and other external systems.
  - This folder represents the infrastructure layer.
  - It will implement the interfaces (AKA. the ports) defined by the application layer.
- Presenters or interfaces:
  - Contain the controllers, gateways and other user facing components for APIs.
  - This folder is also known/named as `user interface` or just `interface`.


More details about this structure:
1. **Value objects** is an **immutable** object and side effect free that represent a descriptive aspect of the domain with no conceptual identity. 
2. Services **must not** reference DTO's (because are part of other layer). So, we should consider using **payloads** or **commands** (best option) to handle the different operations.
3. On the controller now instead of passing the DTO **we instantiate the command** passing the required properties (to instantiate) **using the values from the DTO**.
4. Remember that the factory is a **provider** (@Injectable()), so it **must be registered** on the module as a provider.
5. The ports/interfaces **define the contract** for the interactions with **the external world**. While adapters implement these contracts in services in between the application layer and external systems.

```txt
/application
    /commands
    /ports
      *.repository.ts
    *.module.ts
    *.service/ts

/domain
    /factories
        *.factory.ts
    /value-objects
    *.ts (models NOT entities)

/infrastructure
  *-infrastructure.module.ts
  /persistence
    /in-memory
      ... (this is the same structure as orm but handling in memory)
    /orm
      /entities
        *.entity.ts
      /mappers
        *.mapper.ts
      /repositories
        *.repository.ts
      orm-persistence.module.ts

/presenters
    /http
        /dto
            create-*.dto.ts
            update-*.dto.ts
        *.controller.ts
```
