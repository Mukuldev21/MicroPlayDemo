# Test Cases (Enterprise Standard)

This project contains **35** automated test cases covering UI, API, Mocking, Business Scenarios, Security, Performance, and Resilience.

## 🟢 End-to-End (E2E) UI Tests
| ID | Module | Description | File |
| :--- | :--- | :--- | :--- |
| **TC001** | E2E | Load Data and verify Users, Orders, and Products | `tests/e2e-ui.spec.ts` |
| **TC033** | UI | Verify **Mobile Viewport** Responsiveness | `tests/e2e-ui.spec.ts` |
| **TC034** | E2E | Verify **Cross-Service Integrity** (User+Order) | `tests/e2e-ui.spec.ts` |
| **TC035** | Resilience | Verify **Idempotency** (Reload Data) | `tests/e2e-ui.spec.ts` |

## 🟣 Business Scenarios (Workflows)
| ID | Module | Description | File |
| :--- | :--- | :--- | :--- |
| **TC017** | Customer 360 | Verify aggregated view of all domains (Users, Orders, Products, Payments, Reviews) | `tests/business-scenarios.spec.ts` |
| **TC018** | Payment Risks | Verify visual alert (Red Color) for failed transactions | `tests/business-scenarios.spec.ts` |
| **TC019** | Onboarding | Verify empty states for new user (No Data) | `tests/business-scenarios.spec.ts` |
| **TC029** | Payment | Verify **High Value** transaction display | `tests/business-scenarios.spec.ts` |
| **TC030** | Payment | Verify **Status Styles** (Pending/Refunded) | `tests/business-scenarios.spec.ts` |
| **TC031** | Inventory | Verify **Out of Stock** display (Stock 0) | `tests/business-scenarios.spec.ts` |
| **TC032** | Inventory | Verify **Low Stock** warning (Stock < 5) | `tests/business-scenarios.spec.ts` |

## 🛡 Resilience & Error Handling
| ID | Module | Description | File |
| :--- | :--- | :--- | :--- |
| **TC023** | Resilience | Verify UI handles **Partial Outage** (one service null) | `tests/resilience.spec.ts` |
| **TC024** | Resilience | Verify UI handles **Global Outage** (Gateway down) | `tests/resilience.spec.ts` |
| **TC025** | Resilience | Verify UI handles **Corrupt Data** (missing fields) | `tests/resilience.spec.ts` |

## 🔒 Security & Stress Tests
| ID | Module | Description | File |
| :--- | :--- | :--- | :--- |
| **TC020** | Stress | Verify UI handles **50+ Items** without crashing | `tests/security-performance.spec.ts` |
| **TC021** | Robustness | Verify UI handles **Long Text** (200+ chars) | `tests/security-performance.spec.ts` |
| **TC022** | Security | Verify **XSS Protection** (Script Injection) | `tests/security-performance.spec.ts` |
| **TC026** | Performance | Verify UI handles **Heavy Load** (1000 Items) | `tests/security-performance.spec.ts` |
| **TC027** | Resilience | Verify UI handles **Slow Response** (3s Delay) | `tests/security-performance.spec.ts` |
| **TC028** | Robustness | Verify UI handles **Malformed Data** (Nulls) | `tests/security-performance.spec.ts` |

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
