
## ✅ **Core Features Breakdown**

---

### 👥 **Authentication & User Management**

* [ ] User Registration (Customer, Vehicle Owner, Driver)
* [ ] Admin can create/manage any user
* [ ] Login with JWT token
* [ ] Role-based access control (RBAC) middleware
* [ ] Password encryption (bcrypt)
* [ ] Forgot/reset password (optional)
* [ ] Profile update endpoint

---

### 🚘 **Vehicle Management**

* [ ] Vehicle Owner can:

  * [ ] Add/Edit/Delete their vehicles
  * [ ] View their own vehicle list
* [ ] Admin can:

  * [ ] View all vehicles
  * [ ] Approve/reject vehicles (optional)
* [ ] Vehicle schema fields:

  * Model, type (SUV/Sedan), registration no, seat count, AC/Non-AC, fare per km, isAvailable
* [ ] Optional: Upload vehicle image using Multer

---

### 🧑‍✈️ **Driver Management**

* [ ] Admin can create/update/delete any driver
* [ ] Vehicle Owner can assign driver to their vehicle
* [ ] Driver can:

  * [ ] View assigned vehicle
  * [ ] Update trip status (e.g., “Started”, “Completed”)
* [ ] Driver schema includes:

  * Name, license number, mobile, currentStatus, assignedVehicle

---

### 📆 **Booking Management (Customer-centric)**

* [ ] Browse available vehicles (filter: type, location, seats)
* [ ] Create a booking (date, pickup & drop location)
* [ ] Booking status: Pending, Confirmed, Started, Completed, Cancelled
* [ ] Auto assign driver (optional: logic to pick available one)
* [ ] Prevent booking same vehicle if already assigned
* [ ] Cancel Booking (by customer before trip starts)
* [ ] View user’s own bookings
* [ ] Booking fare calculation (distance \* fare per km)

---

### 🛠️ **Admin Features**

* [ ] View all users (filter by role)
* [ ] Manage vehicles, bookings, drivers
* [ ] Block/unblock user/driver/vehicle
* [ ] Approve vehicle listings (optional)
* [ ] See system-wide stats and aggregations

---

### 📊 **Analytics & Aggregation**

* [ ] Total bookings made this month (Admin)
* [ ] Revenue generated per vehicle owner
* [ ] Number of trips completed by a driver
* [ ] Top 5 most-booked vehicles
* [ ] Customer with highest bookings
* [ ] Avg. fare per vehicle type (SUV/Sedan)
* [ ] Total revenue by month (Admin panel charts)

---

### 🔍 **Filtering, Search & Pagination**

* [ ] Vehicle search by type, location, seat capacity
* [ ] Pagination for listings (vehicles, bookings, users)
* [ ] Sorting by fare, date, or rating (if added)

---

### 🔔 **Extra Features (Optional Enhancements)**

* [ ] Notification system (mocked or via email)
* [ ] Booking invoice generation (PDF)
* [ ] Driver live location tracking (mock data)
* [ ] Booking rating & review (customer → driver)
* [ ] Booking history export (CSV)

---

## 📁 Suggested Folder Structure

```
/controllers
/models
/routes
/middlewares
/utils
/config
```

---

