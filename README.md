# SmartShop Portal

Angular application demonstrating routing, inter-component communication, DummyJSON API integration, RxJS, and route protection.

## Features
* **Login** — DummyJSON authentication with username/password
* **Dashboard** — Personalized welcome message and navigation menu
* **Products** — Product listing from DummyJSON API
* **Product Details** — Single product view using route parameter `:id`
* **Profile** — Logged-in user profile page
* **Header** — Dynamic salutation and logout (visible after login)
* **Auth Guard** — Protects dashboard, products, product details, and profile routes

## Folder Structure
```text
src/app/
├── components/
│   ├── login/
│   ├── dashboard/
│   ├── products/
│   ├── product-details/
│   ├── profile/
│   └── header/
├── services/
│   ├── auth.service.ts
│   └── product.service.ts
├── guards/
│   └── auth.guard.ts
├── app.routes.ts
└── app.config.ts
```

## Routes
| Route | Component | Protected |
| :--- | :--- | :--- |
| `/login` | Login | No |
| `/dashboard` | Dashboard | Yes |
| `/products` | Products | Yes |
| `/products/:id` | Product Details | Yes |
| `/profile` | Profile | Yes |

## Demo Credentials
* **Username:** `emilys`
* **Password:** `emilyspass`

## How to Run
### Setup & Start
Run the following commands in the project root:
```bash
npm install
ng serve
```

*Note for Windows PowerShell users:* If script execution policy blocks `npm` or `ng`, please run:
```powershell
npm.cmd install
npx.cmd ng serve
```

### Access Application
Open [http://localhost:54391](http://localhost:54391) in your browser.

## Build
Compile the production bundle:
```bash
ng build
```

## RxJS Usage
* **BehaviorSubject** in `AuthService` for shared logged-in user state.
* **Observable subscriptions** in `Login`, `Dashboard`, `Header`, and `Profile` components.
* **tap, map, catchError** operators in API service methods.
