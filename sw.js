self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(self.clients.claim());
});

// Listen for messages from the app to schedule notifications
self.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'SCHEDULE_NOTIFICATIONS') {
    scheduleNotifications(e.data.plan);
  }
});

function scheduleNotifications(plan) {
  var Q = "Water breaks rock not because of its strength but because of its consistency. 🇪🇸";
  var notifs = [
    [8,  0,  "RowHard - Morning check-in",  "Log your HRV and sleep for your recovery score. " + Q],
    [12, 0,  "RowHard - Midday reminder",    (plan ? "Today: " + plan + " - " : "") + Q],
    [17, 0,  "RowHard - Session time",       (plan ? "Today: " + plan + " - " : "") + Q],
    [18, 0,  "RowHard - Get it done",        Q],
    [22, 0,  "RowHard - Stretch NOW",        "15 minutes. Non-negotiable. Deadline 11:59pm."],
    [22, 40, "RowHard - Sleep NOW",           "Every minute awake is a minute not recovering."],
    [23, 30, "RowHard - 29 minutes left",    "Log your stretch RIGHT NOW. No excuses."]
  ];

  var now = new Date();
  notifs.forEach(function(x) {
    var ms = new Date(now.getFullYear(), now.getMonth(), now.getDate(), x[0], x[1], 0) - now;
    if (ms > 0) {
      setTimeout(function(title, body) {
        return function() {
          self.registration.showNotification(title, {
            body: body,
            icon: '/RowHard/icon.png',
            badge: '/RowHard/icon.png'
          });
        };
      }(x[2], x[3]), ms);
    }
  });
}
