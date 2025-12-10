# Test Cases

This project contains **10** automated test cases covering UI, API, Mocking, and Performance.

## 🟢 End-to-End (E2E) UI Tests
| Test Case | Description | File |
| :--- | :--- | :--- |
| **Should display users and orders** | Verifies that clicking "Load Data" on the UI successfully fetches and displays data from the Gateway. | `tests/demotest.spec.ts` |

## 🔵 API Tests
| Test Case | Description | File |
| :--- | :--- | :--- |
| **User Service should return users** | Verifies User Service returns 200 OK and valid JSON array with names. | `tests/api.spec.ts` |
| **Order Service should return orders** | Verifies Order Service returns 200 OK and valid JSON array with items. | `tests/api.spec.ts` |
| **Gateway should return aggregated data** | Verifies Gateway aggregates Users and Orders correctly with schema validation. | `tests/api.spec.ts` |

## 🔴 Negative API & Performance Tests
| Test Case | Description | File |
| :--- | :--- | :--- |
| **User Service 404** | Verifies User Service returns 404 for invalid endpoints. | `tests/api-negative.spec.ts` |
| **Order Service 404** | Verifies Order Service returns 404 for invalid endpoints. | `tests/api-negative.spec.ts` |
| **Gateway 404** | Verifies Gateway returns 404 for invalid endpoints. | `tests/api-negative.spec.ts` |
| **Performance Check** | Verifies User Service responds within **200ms**. | `tests/api-negative.spec.ts` |

## 🟠 UI Mocking Tests
| Test Case | Description | File |
| :--- | :--- | :--- |
| **Mocked Data Display** | Verifies UI displays specific mocked data (ignoring real backend). | `tests/ui-mock.spec.ts` |
| **Empty Data Handling** | Verifies UI handles empty lists gracefully without crashing. | `tests/ui-mock.spec.ts` |

---
**Run All Tests:**
```bash
npx playwright test
```
