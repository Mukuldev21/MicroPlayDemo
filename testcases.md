# Test Cases (Enterprise Standard)

This project contains **19** automated test cases covering UI, API, Mocking, Business Scenarios, and Performance.

## 🟢 End-to-End (E2E) UI Tests
| ID | Module | Description | File |
| :--- | :--- | :--- | :--- |
| **TC001** | E2E | Load Data and verify Users, Orders, and Products | `tests/e2e-ui.spec.ts` |

## 🟣 Business Scenarios (Workflows)
| ID | Module | Description | File |
| :--- | :--- | :--- | :--- |
| **TC017** | Customer 360 | Verify aggregated view of all domains (Users, Orders, Products, Payments, Reviews) | `tests/business-scenarios.spec.ts` |
| **TC018** | Payment Risks | Verify visual alert (Red Color) for failed transactions | `tests/business-scenarios.spec.ts` |
| **TC019** | Onboarding | Verify empty states for new user (No Data) | `tests/business-scenarios.spec.ts` |

## 🔵 API Tests
| ID | Module | Description | File |
| :--- | :--- | :--- | :--- |
| **TC002** | User | Verify User Service returns 200 & valid JSON | `tests/api.spec.ts` |
| **TC003** | Order | Verify Order Service returns 200 & valid JSON | `tests/api.spec.ts` |
| **TC004** | Product | Verify Product Service returns 200 & valid JSON | `tests/api.spec.ts` |
| **TC005** | Gateway | Verify Gateway aggregates all data correctly | `tests/api.spec.ts` |
| **TC013** | Payment | Verify Payment Service returns 200 & valid JSON | `tests/api.spec.ts` |
| **TC014** | Review | Verify Review Service returns 200 & valid JSON | `tests/api.spec.ts` |

## 🔴 Negative & Performance Tests
| ID | Module | Description | File |
| :--- | :--- | :--- | :--- |
| **TC006** | User | Verify 404 for invalid User endpoint | `tests/api-negative.spec.ts` |
| **TC007** | Product | Verify 404 for invalid Product endpoint | `tests/api-negative.spec.ts` |
| **TC015** | Payment | Verify 404 for invalid Payment endpoint | `tests/api-negative.spec.ts` |
| **TC016** | Review | Verify 404 for invalid Review endpoint | `tests/api-negative.spec.ts` |
| **TC008** | Gateway | Verify 404 for unknown Gateway route | `tests/api-negative.spec.ts` |
| **TC009** | Order | Verify 404 for invalid Order endpoint | `tests/api-negative.spec.ts` |
| **TC010** | Perf | Verify User Service responds < 200ms | `tests/api-negative.spec.ts` |

## 🟠 UI Mocking Tests
| ID | Module | Description | File |
| :--- | :--- | :--- | :--- |
| **TC011** | Mock | Verify UI displays **Mocked Data** correctly | `tests/ui-mock.spec.ts` |
| **TC012** | Mock | Verify UI handles **Empty Data** gracefuly | `tests/ui-mock.spec.ts` |

---
**Run All Tests:**
```bash
npx playwright test
```
