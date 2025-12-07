/********************************************
 * Dreamss Homestay – App logic (V2/C)
 * - Quản lý phòng, combo, giá
 * - Chặn trùng giờ + cộng 30 phút dọn phòng
 * - Tìm phòng trống + link Drive
 * - Phiếu xác nhận + tính tiền
 * - Gửi dữ liệu lên Google Sheets (Booking + Customers)
 ********************************************/

// ⚠ NHỚ ĐỔI URL NÀY NẾU BẠN TRIỂN KHAI LẠI APPS SCRIPT
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwNcNiUVMneLWNUDSVdg037CZFs9ZzyN7GqyAwjCgBwperFQoCYyYuCfZCNP2GqCZ9s/exec";

/* =========================================================
   1. DANH SÁCH PHÒNG + GIÁ + LINK DRIVE
   ========================================================= */

const rooms = [
  // ===== CHI NHÁNH 1 =====
  {
    id: "CN1-D1",
    branch: "CN1",
    name: "Dream 1",
    driveLink: "https://drive.google.com/drive/folders/19btNqFn211oO6f7dy7BsqbR7_lf_LwP7?usp=drive_link",
    prices: {
      combo3h: 299000,
      combo11_21: 669000,
      overnight: 479000,
      overnight_long: 789000,
      day_14_12: 879000,
      extraHour: 60000,
    },
  },
  {
    id: "CN1-D2",
    branch: "CN1",
    name: "Dream 2",
    driveLink: "https://drive.google.com/drive/folders/1zrNP5defN08jrdz1PjDthoNXjuXGAIdn?usp=drive_link",
    prices: {
      combo3h: 309000,
      combo11_21: 669000,
      overnight: 489000,
      overnight_long: 799000,
      day_14_12: 879000,
      extraHour: 60000,
    },
  },
  {
    id: "CN1-D3",
    branch: "CN1",
    name: "Dream 3",
    driveLink: "https://drive.google.com/drive/folders/17ty0WlHVvGwoAfkRYjnATRrw3HoxWRoi?usp=drive_link",
    prices: {
      combo3h: 279000,
      combo11_21: 619000,
      overnight: 429000,
      overnight_long: 719000,
      day_14_12: 699000,
      extraHour: 55000,
    },
  },
  {
    id: "CN1-D4",
    branch: "CN1",
    name: "Dream 4",
    driveLink: "https://drive.google.com/drive/folders/1zN_Nvzgb0sApWmovHIU4fTV7tjFCyHI1?usp=drive_link",
    prices: {
      combo3h: 279000,
      combo11_21: 619000,
      overnight: 429000,
      overnight_long: 719000,
      day_14_12: 699000,
      extraHour: 55000,
    },
  },
  {
    id: "CN1-D5",
    branch: "CN1",
    name: "Dream 5",
    driveLink: "https://drive.google.com/drive/folders/1NJhUt4vfHaV_GSAzkDrQPNK-GwmNaKAt?usp=drive_link",
    prices: {
      combo3h: 349000,
      combo11_21: 709000,
      overnight: 489000,
      overnight_long: 849000,
      day_14_12: 739000,
      extraHour: 60000,
    },
  },
  {
    id: "CN1-D6",
    branch: "CN1",
    name: "Dream 6",
    driveLink: "https://drive.google.com/drive/folders/1yI3IQDCpjqUe5IAW3VGZu2YX2nEiV9ll?usp=drive_link",
    prices: {
      combo3h: 369000,
      combo11_21: 739000,
      overnight: 549000,
      overnight_long: 909000,
      day_14_12: 1089000,
      extraHour: 65000,
    },
  },
  {
    id: "CN1-D8",
    branch: "CN1",
    name: "Dream 8",
    driveLink: "https://drive.google.com/drive/folders/19y3fWjmAlcmMSphqx5XcW0HDGPGWm-U4?usp=drive_link",
    prices: {
      combo3h: 339000,
      combo11_21: 719000,
      overnight: 529000,
      overnight_long: 829000,
      day_14_12: 999000,
      extraHour: 70000,
    },
  },
  {
    id: "CN1-D9",
    branch: "CN1",
    name: "Dream 9",
    driveLink: "https://drive.google.com/drive/folders/17k0pu-7-KcV3dD2MEW2AXBKBRM1TdfxI?usp=drive_link",
    prices: {
      combo3h: 349000,
      combo11_21: 729000,
      overnight: 539000,
      overnight_long: 839000,
      day_14_12: 1059000,
      extraHour: 70000,
    },
  },
  {
    id: "CN1-D10",
    branch: "CN1",
    name: "Dream 10",
    driveLink: "https://drive.google.com/drive/folders/1-iKuaEaxgZ_PbeyHuhYwV2L19wRgVM-L?usp=drive_link",
    prices: {
      combo3h: 329000,
      combo11_21: 719000,
      overnight: 519000,
      overnight_long: 819000,
      day_14_12: 899000,
      extraHour: 70000,
    },
  },

  // ===== CHI NHÁNH 2 =====
  {
    id: "CN2-D11",
    branch: "CN2",
    name: "Dream 11",
    driveLink: "https://drive.google.com/drive/folders/1ncdYUe0bOs1fdaIPHO361FNoSVRa8_nt?usp=drive_link",
    prices: {
      combo3h: 279000,
      combo11_21: 629000,
      overnight: 429000,
      overnight_long: 729000,
      day_14_12: 699000,
      extraHour: 55000,
    },
  },
  {
    id: "CN2-D12A",
    branch: "CN2",
    name: "Dream 12A",
    driveLink: "https://drive.google.com/drive/folders/15WY0Ebb61u1Bz4eUyjKll_YGBw5w516Q?usp=drive_link",
    prices: {
      combo3h: 299000,
      combo11_21: 679000,
      overnight: 479000,
      overnight_long: 799000,
      day_14_12: 879000,
      extraHour: 60000,
    },
  },
  {
    id: "CN2-D12B",
    branch: "CN2",
    name: "Dream 12B",
    driveLink: "https://drive.google.com/drive/folders/1aJHI4V5xIPaGOpgGcoqhhY4sLuTEQV_w?usp=drive_link",
    prices: {
      combo3h: 299000,
      combo11_21: 679000,
      overnight: 479000,
      overnight_long: 799000,
      day_14_12: 879000,
      extraHour: 60000,
    },
  },
  {
    id: "CN2-D14",
    branch: "CN2",
    name: "Dream 14",
    driveLink: "https://drive.google.com/drive/folders/1NjP2v5OGH6xJvo0pNa05_oOPjmft4UyA?usp=drive_link",
    prices: {
      combo3h: 299000,
      combo11_21: 679000,
      overnight: 479000,
      overnight_long: 799000,
      day_14_12: 879000,
      extraHour: 60000,
    },
  },

  // ===== CHI NHÁNH 3 =====
  {
    id: "CN3-D1",
    branch: "CN3",
    name: "Dream 1",
    driveLink: "https://drive.google.com/drive/folders/1Gq7aVbQd5Esk6PsP2DDPumrJM0JYhQOF?usp=drive_link",
    prices: {
      combo3h: 309000,
      combo11_21: 689000,
      overnight: 489000,
      overnight_long: 799000,
      day_14_12: 839000,
      extraHour: 60000,
    },
  },
  {
    id: "CN3-D2",
    branch: "CN3",
    name: "Dream 2",
    driveLink: "https://drive.google.com/drive/folders/1iPvmlf0NZXEY_gY1ecq5VlQbz5epTqx6?usp=drive_link",
    prices: {
      combo3h: 349000,
      combo11_21: 729000,
      overnight: 509000,
      overnight_long: 829000,
      day_14_12: 899000,
      extraHour: 65000,
    },
  },
  {
    id: "CN3-D3",
    branch: "CN3",
    name: "Dream 3",
    driveLink: "https://drive.google.com/drive/folders/1_Em2hsvRkLJkDCOD_4wjVbPYWe91s7ER?usp=drive_link",
    prices: {
      combo3h: 299000,
      combo11_21: 649000,
      overnight: 469000,
      overnight_long: 759000,
      day_14_12: 799000,
      extraHour: 55000,
    },
  },
  {
    id: "CN3-D4",
    branch: "CN3",
    name: "Dream 4",
    driveLink: "https://drive.google.com/drive/folders/1gLXlEEPfgUPd7y0ccGVkRDWvaamrfjjU?usp=drive_link",
    prices: {
      combo3h: 349000,
      combo11_21: 719000,
      overnight: 509000,
      overnight_long: 809000,
      day_14_12: 899000,
      extraHour: 65000,
    },
  },
  {
    id: "CN3-D5",
    branch: "CN3",
    name: "Dream 5",
    driveLink: "https://drive.google.com/drive/folders/134AclPMrcvuc2Q2L0ryXY91qS5i1eNXK?usp=drive_link",
    prices: {
      combo3h: 349000,
      combo11_21: 739000,
      overnight: 499000,
      overnight_long: 899000,
      day_14_12: 899000,
      extraHour: 65000,
    },
  },
  {
    id: "CN3-D6",
    branch: "CN3",
    name: "Dream 6",
    driveLink: "https://drive.google.com/drive/folders/1Lowt3hM3swbnubw-BelDWKqlKHKUHLNA?usp=drive_link",
    prices: {
      combo3h: 309000,
      combo11_21: 649000,
      overnight: 479000,
      overnight_long: 749000,
      day_14_12: 869000,
      extraHour: 60000,
    },
  },
  {
    id: "CN3-D7",
    branch: "CN3",
    name: "Dream 7",
    driveLink: "https://drive.google.com/drive/folders/1xyFaFnCShjSW5wzvoMm0EMydEq_tUtGw?usp=drive_link",
    prices: {
      combo3h: 349000,
      combo11_21: 739000,
      overnight: 509000,
      overnight_long: 829000,
      day_14_12: 899000,
      extraHour: 65000,
    },
  },
  {
    id: "CN3-D8",
    branch: "CN3",
    name: "Dream 8",
    driveLink: "https://drive.google.com/drive/folders/1Pc_jj_K3g0UnBQ0AP86z_D5vYPOwIl63?usp=drive_link",
    prices: {
      combo3h: 349000,
      combo11_21: 739000,
      overnight: 509000,
      overnight_long: 799000,
      day_14_12: 899000,
      extraHour: 65000,
    },
  },
  {
    id: "CN3-D9",
    branch: "CN3",
    name: "Dream 9",
    driveLink: "https://drive.google.com/drive/folders/1ZTBbjx-_MEUYZ37Mk2-ofXCceoMQDpsf?usp=drive_link",
    prices: {
      combo3h: 319000,
      combo11_21: 679000,
      overnight: 489000,
      overnight_long: 789000,
      day_14_12: 799000,
      extraHour: 60000,
    },
  },
  {
    id: "CN3-D10",
    branch: "CN3",
    name: "Dream 10",
    driveLink: "https://drive.google.com/drive/folders/1ufocDlZ6laxdrf-8MLLljlRMdwNJ1lHT?usp=drive_link",
    prices: {
      combo3h: 359000,
      combo11_21: 749000,
      overnight: 559000,
      overnight_long: 909000,
      day_14_12: 1089000,
      extraHour: 70000,
    },
  },
  {
    id: "CN3-D11",
    branch: "CN3",
    name: "Dream 11",
    driveLink: "https://drive.google.com/drive/folders/1c4vU85pPCFhtMxpv3aj3t7mcEBk1pWXe?usp=drive_link",
    prices: {
      combo3h: 399000,
      combo11_21: 889000,
      overnight: 599000,
      overnight_long: 1029000,
      day_14_12: 1199000,
      extraHour: 75000,
    },
  },
  {
    id: "CN3-D12",
    branch: "CN3",
    name: "Dream 12",
    driveLink: "https://drive.google.com/drive/folders/1Wq6I08reldeyFAywxjGFo0z42NC_yAKo?usp=drive_link",
    prices: {
      combo3h: 289000,
      combo11_21: 639000,
      overnight: 449000,
      overnight_long: 749000,
      day_14_12: 899000,
      extraHour: 55000,
    },
  },
];

/* =========================================================
   2. CẤU HÌNH COMBO
   ========================================================= */

const combos = [
  { id: "combo3h",       label: "Combo 3 tiếng",                  includedMinutes: 180 },
  { id: "combo11_21",    label: "Combo 11:00–21:00",              includedMinutes: 600 },
  { id: "overnight",     label: "Qua đêm 21:30–10:30",            includedMinutes: 780 },
  { id: "overnight_long",label: "Combo 21:30–17:00",              includedMinutes: 1170 },
  { id: "day_14_12",     label: "Theo ngày 14:00–12:00 hôm sau",  includedMinutes: 1320 },
];

/* =========================================================
   3. BIẾN LƯU BOOKING TẠM TRÊN WEB
   ========================================================= */

const bookings = []; // mỗi phần tử: {roomId, comboId, checkIn, checkOut, cleaningEnd, baseTotal, ...}
let currentBookingIndex = null;

/* =========================================================
   4. HÀM TIỆN ÍCH
   ========================================================= */

function formatDateTime(date) {
  const d = date.toISOString().slice(0, 10);
  const h = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");
  return `${d} ${h}:${m}`;
}

function formatTime(date) {
  const h = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}

function formatCurrencyVND(amount) {
  const n = Number(amount) || 0;
  return n.toLocaleString("vi-VN") + " đ";
}

function isOverlap(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

// check trùng phòng với buffer 30'
function hasTimeConflict(existingBooking, newStart, newEnd) {
  const cleaningBufferMs = 30 * 60000; // 30 phút

  const exStart = existingBooking.checkIn;
  const exEnd   = existingBooking.checkOut + cleaningBufferMs;

  const ns = newStart;
  const ne = newEnd + cleaningBufferMs;

  return isOverlap(exStart, exEnd, ns, ne);
}

// tính giá theo combo + giờ thêm (mỗi block 30 phút = 0.5h)
function calculatePrice(roomId, comboId, checkIn, checkOut) {
  const room  = rooms.find(r => r.id === roomId);
  const combo = combos.find(c => c.id === comboId);
  if (!room || !combo || !room.prices) return null;

  const basePrice = room.prices[comboId];
  const extraHourRate = room.prices.extraHour || 0;
  if (basePrice == null) return null;

  const durationMinutes = (checkOut.getTime() - checkIn.getTime()) / 60000;
  if (durationMinutes <= 0) return null;

  const included = combo.includedMinutes;
  const extraMinutes = Math.max(0, durationMinutes - included);

  const blockMinutes = 30;
  const extraBlocks = Math.ceil(extraMinutes / blockMinutes);
  const extraHoursBilled = (extraBlocks * blockMinutes) / 60;
  const extraPrice = extraHoursBilled * extraHourRate;
  const total = Math.round(basePrice + extraPrice);

  return {
    durationMinutes,
    extraMinutes,
    includedMinutes: included,
    extraHoursBilled,
    basePrice,
    extraPrice,
    total,
  };
}

/* =========================================================
   5. RENDER DROPDOWN
   ========================================================= */

function populateSelectOptions() {
  const roomSelect  = document.getElementById("roomSelect");
  const viewRoom    = document.getElementById("viewRoom");
  const comboSelect = document.getElementById("comboSelect");
  const searchCombo = document.getElementById("searchCombo");

  roomSelect.innerHTML = "";
  viewRoom.innerHTML   = "";
  rooms.forEach(room => {
    const label = `${room.name} (${room.branch})`;

    const opt1 = document.createElement("option");
    opt1.value = room.id;
    opt1.textContent = label;
    roomSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = room.id;
    opt2.textContent = label;
    viewRoom.appendChild(opt2);
  });

  comboSelect.innerHTML = "";
  searchCombo.innerHTML = "";
  combos.forEach(combo => {
    const opt1 = document.createElement("option");
    opt1.value = combo.id;
    opt1.textContent = combo.label;
    comboSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = combo.id;
    opt2.textContent = combo.label;
    searchCombo.appendChild(opt2);
  });
}

/* =========================================================
   6. DANH SÁCH BOOKING (TRONG PHIÊN)
   ========================================================= */

function renderBookingList() {
  const container = document.getElementById("bookingList");
  if (bookings.length === 0) {
    container.textContent = "Chưa có booking nào.";
    return;
  }

  let html = "";
  const byRoom = {};

  bookings.forEach(b => {
    if (!byRoom[b.roomId]) byRoom[b.roomId] = [];
    byRoom[b.roomId].push(b);
  });

  Object.keys(byRoom).forEach(roomId => {
    const room = rooms.find(r => r.id === roomId);
    html += `<div class="tag"><strong>${room ? room.name : roomId}</strong> – ${room ? room.branch : ""}</div><br>`;
    byRoom[roomId].forEach(b => {
      const combo = combos.find(c => c.id === b.comboId);
      const checkIn  = new Date(b.checkIn);
      const checkOut = new Date(b.checkOut);
      const cleaningEnd = new Date(b.cleaningEnd);
      const displayPrice = b.finalTotal ?? b.baseTotal;
      const customerText = b.customerName
        ? ` | Khách: ${b.customerName} (${b.customerPhone || ""})`
        : "";

      html += `- ${combo ? combo.label : ""} | ${formatDateTime(checkIn)} → ${formatDateTime(checkOut)}
        | Dọn: ${formatTime(checkOut)}–${formatTime(cleaningEnd)} 
        | <strong>${formatCurrencyVND(displayPrice)}</strong>${customerText}<br>`;
    });
    html += "<br>";
  });

  container.innerHTML = html;
}

/* =========================================================
   7. CẬP NHẬT GIÁ DỰ KIẾN (FORM THÊM BOOKING)
   ========================================================= */

function updatePricePreview() {
  const roomId    = document.getElementById("roomSelect").value;
  const comboId   = document.getElementById("comboSelect").value;
  const checkInStr  = document.getElementById("checkIn").value;
  const checkOutStr = document.getElementById("checkOut").value;
  const preview   = document.getElementById("pricePreview");

  if (!roomId || !comboId || !checkInStr || !checkOutStr) {
    preview.textContent = "Chọn phòng, combo và giờ để xem giá dự kiến.";
    return;
  }

  const checkIn  = new Date(checkInStr);
  const checkOut = new Date(checkOutStr);
  const result = calculatePrice(roomId, comboId, checkIn, checkOut);

  if (!result) {
    preview.textContent = "Thời gian không hợp lệ hoặc phòng không có giá cho combo này.";
    return;
  }

  const durationHours = (result.durationMinutes / 60).toFixed(2);
  const includedHours = (result.includedMinutes / 60).toFixed(2);
  const extraHours    = result.extraHoursBilled.toFixed(2);

  preview.innerHTML = `
    Thời lượng: <strong>${durationHours} giờ</strong> (bao trong combo: ${includedHours} giờ)<br>
    Giờ thêm được tính: <strong>${extraHours} giờ</strong><br>
    Giá combo: <strong>${formatCurrencyVND(result.basePrice)}</strong><br>
    Phụ thu giờ thêm: <strong>${formatCurrencyVND(result.extraPrice)}</strong><br>
    Tổng tạm tính: <strong>${formatCurrencyVND(result.total)}</strong>
  `;
}

/* =========================================================
   8. SUBMIT THÊM BOOKING
   ========================================================= */

document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const roomId    = document.getElementById("roomSelect").value;
  const comboId   = document.getElementById("comboSelect").value;
  const checkInStr  = document.getElementById("checkIn").value;
  const checkOutStr = document.getElementById("checkOut").value;

  if (!roomId || !comboId || !checkInStr || !checkOutStr) {
    alert("Vui lòng nhập đầy đủ thông tin (phòng, combo, giờ).");
    return;
  }

  const checkIn  = new Date(checkInStr);
  const checkOut = new Date(checkOutStr);

  if (checkOut <= checkIn) {
    alert("Giờ check-out phải sau giờ check-in.");
    return;
  }

  const priceInfo = calculatePrice(roomId, comboId, checkIn, checkOut);
  if (!priceInfo) {
    alert("Không tính được giá. Vui lòng kiểm tra lại combo / thời gian.");
    return;
  }

  const newStart = checkIn.getTime();
  const newEnd   = checkOut.getTime();
  const cleaningBufferMs = 30 * 60000;
  const cleaningEnd = newEnd + cleaningBufferMs;

  // chặn trùng phòng + 30 phút dọn
  const conflict = bookings.some(
    b => b.roomId === roomId && hasTimeConflict(b, newStart, newEnd)
  );
  if (conflict) {
    alert("Phòng này đã có khách hoặc đang trong thời gian dọn (30 phút sau check-out). Vui lòng chọn giờ khác.");
    return;
  }

  const booking = {
    roomId,
    comboId,
    checkIn: newStart,
    checkOut: newEnd,
    cleaningEnd,
    baseTotal: priceInfo.total,
    durationMinutes: priceInfo.durationMinutes,
  };

  bookings.push(booking);
  currentBookingIndex = bookings.length - 1;

  alert("✅ Đã lưu booking tạm. Tiếp theo điền thông tin khách trong Phiếu xác nhận.");

  renderBookingList();
  updatePricePreview();
  openConfirmForCurrent();
});

/* =========================================================
   9. XEM LỊCH CÒN/HẾT CHO 1 PHÒNG (THEO NGÀY)
   ========================================================= */

document.getElementById("viewForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const roomId = document.getElementById("viewRoom").value;
  const dateStr = document.getElementById("viewDate").value;
  const container = document.getElementById("availabilityTable");
  container.innerHTML = "";

  if (!roomId || !dateStr) {
    alert("Vui lòng chọn phòng và ngày.");
    return;
  }

  const stepMinutes = 60;
  const slots = [];
  let slotStart = new Date(dateStr + "T00:00:00");

  for (let i = 0; i < 24; i++) {
    const slotEnd = new Date(slotStart.getTime() + stepMinutes * 60000);
    slots.push({ start: new Date(slotStart), end: new Date(slotEnd) });
    slotStart = slotEnd;
  }

  const roomBookings = bookings.filter(b => b.roomId === roomId);
  const cleaningBufferMs = 30 * 60000;

  const table = document.createElement("table");
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = "<th>Khung giờ</th><th>Trạng thái</th>";
  table.appendChild(headerRow);

  slots.forEach(slot => {
    const isBooked = roomBookings.some(b => {
      return isOverlap(
        b.checkIn,
        b.checkOut + cleaningBufferMs,
        slot.start.getTime(),
        slot.end.getTime()
      );
    });

    const tr = document.createElement("tr");
    const timeTd = document.createElement("td");
    timeTd.textContent = `${formatTime(slot.start)} - ${formatTime(slot.end)}`;
    const statusTd = document.createElement("td");
    statusTd.textContent = isBooked ? "HẾT (khách hoặc dọn)" : "CÒN";
    statusTd.className = isBooked ? "booked" : "available";

    tr.appendChild(timeTd);
    tr.appendChild(statusTd);
    table.appendChild(tr);
  });

  container.appendChild(table);
});

/* =========================================================
   10. TÌM PHÒNG TRỐNG + LINK DRIVE
   ========================================================= */

document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const checkInStr  = document.getElementById("searchCheckIn").value;
  const checkOutStr = document.getElementById("searchCheckOut").value;
  const comboId     = document.getElementById("searchCombo").value;
  const container   = document.getElementById("searchResults");
  container.innerHTML = "";

  if (!checkInStr || !checkOutStr || !comboId) {
    alert("Vui lòng chọn giờ check-in, check-out và combo.");
    return;
  }

  const checkIn  = new Date(checkInStr);
  const checkOut = new Date(checkOutStr);

  if (checkOut <= checkIn) {
    alert("Giờ check-out phải sau giờ check-in.");
    return;
  }

  const newStart = checkIn.getTime();
  const newEnd   = checkOut.getTime();

  const availableRooms = rooms.filter(room => {
    return !bookings.some(
      b => b.roomId === room.id && hasTimeConflict(b, newStart, newEnd)
    );
  });

  if (availableRooms.length === 0) {
    container.innerHTML = "<p>Không có phòng trống trong khoảng thời gian này.</p>";
    return;
  }

  const summaryTitle = document.createElement("p");
  summaryTitle.className = "small-text";
  summaryTitle.innerHTML = `
    Kết quả phòng trống từ <strong>${formatDateTime(checkIn)}</strong> 
    đến <strong>${formatDateTime(checkOut)}</strong> 
    (${combos.find(c => c.id === comboId)?.label || ""})
  `;
  container.appendChild(summaryTitle);

  const byBranch = {};
  availableRooms.forEach(room => {
    if (!byBranch[room.branch]) byBranch[room.branch] = [];
    byBranch[room.branch].push(room);
  });

  const branches = Object.keys(byBranch).sort();

  branches.forEach(branch => {
    const branchTitle = document.createElement("h3");
    const branchLabel =
      branch === "CN1" ? "Chi nhánh 1" :
      branch === "CN2" ? "Chi nhánh 2" :
      branch === "CN3" ? "Chi nhánh 3" : branch;
    branchTitle.textContent = branchLabel;
    container.appendChild(branchTitle);

    byBranch[branch].forEach(room => {
      const priceInfo = calculatePrice(room.id, comboId, checkIn, checkOut);
      const p = document.createElement("p");
      p.className = "small-text";
      p.innerHTML = `
        <strong>${room.name}</strong> – ${
          priceInfo ? formatCurrencyVND(priceInfo.total) : "—"
        }<br>
        Link phòng: 
        <a href="${room.driveLink}" target="_blank">${room.driveLink}</a>
      `;
      container.appendChild(p);
    });
  });
});

/* =========================================================
   11. PHIẾU XÁC NHẬN – MỞ FORM
   ========================================================= */

function openConfirmForCurrent() {
  if (currentBookingIndex == null) return;
  const b = bookings[currentBookingIndex];
  const room  = rooms.find(r => r.id === b.roomId);
  const combo = combos.find(c => c.id === b.comboId);

  document.getElementById("confirmCard").style.display = "block";

  document.getElementById("cfRoomInfo").value  = room ? `${room.name} – ${room.branch}` : b.roomId;
  document.getElementById("cfComboInfo").value = combo ? combo.label : b.comboId;
  document.getElementById("cfCheckIn").value   = formatDateTime(new Date(b.checkIn));
  document.getElementById("cfCheckOut").value  = formatDateTime(new Date(b.checkOut));
  document.getElementById("cfBasePrice").value = formatCurrencyVND(b.baseTotal);
  document.getElementById("cfDuration").value  = (b.durationMinutes / 60).toFixed(2);

  document.getElementById("cfCustomerName").value   = b.customerName || "";
  document.getElementById("cfCustomerPhone").value  = b.customerPhone || "";
  document.getElementById("cfGuestCount").value     = b.guestCount || 2;
  document.getElementById("cfDiscountPercent").value= b.discountPercent ?? "";
  document.getElementById("cfDiscountAmount").value = b.discountAmount ?? "";
  document.getElementById("cfDecorFee").value       = b.decorFee ?? "";
  document.getElementById("cfOtherFee").value       = b.otherFee ?? "";
  document.getElementById("cfPaidAmount").value     = b.paidAmount ?? "";
  document.getElementById("cfPaidStatus").value     = b.paidStatus || "chua";
  document.getElementById("cfNote").value           = b.note || "";

  updateConfirmPriceSummary();
}

function getNumberInput(id) {
  const v = document.getElementById(id).value.trim();
  if (!v) return 0;
  const n = Number(v);
  return isNaN(n) ? 0 : n;
}

/* =========================================================
   12. TÍNH TỔNG TIỀN TRONG PHIẾU XÁC NHẬN
   ========================================================= */

function updateConfirmPriceSummary() {
  if (currentBookingIndex == null) return;
  const b = bookings[currentBookingIndex];
  const base = b.baseTotal || 0;

  const discountPercent = getNumberInput("cfDiscountPercent");
  const discountAmount  = getNumberInput("cfDiscountAmount");
  const decorFee        = getNumberInput("cfDecorFee");
  const otherFee        = getNumberInput("cfOtherFee");
  const guestCount      = getNumberInput("cfGuestCount") || 2;
  const paidAmount      = getNumberInput("cfPaidAmount");

  const extraGuests   = Math.max(0, guestCount - 2);
  const extraGuestFee = extraGuests * 100000;

  const discountFromPercent = (base * discountPercent) / 100;
  let total = base - discountFromPercent - discountAmount +
    extraGuestFee + decorFee + otherFee;

  if (total < 0) total = 0;

  const remain = Math.max(0, total - paidAmount);

  const summary = document.getElementById("cfPriceSummary");
  summary.innerHTML = `
    Giá home gốc: <strong>${formatCurrencyVND(base)}</strong><br>
    Giảm giá %: -${formatCurrencyVND(discountFromPercent)}<br>
    Giảm giá cố định: -${formatCurrencyVND(discountAmount)}<br>
    Phụ thu khách thứ 3 trở lên (${extraGuests} khách): <strong>${formatCurrencyVND(extraGuestFee)}</strong><br>
    Phí trang trí: <strong>${formatCurrencyVND(decorFee)}</strong><br>
    Phí khác: <strong>${formatCurrencyVND(otherFee)}</strong><br><br>
    Tổng sau giảm/phụ thu: <strong>${formatCurrencyVND(total)}</strong><br>
    Đã thanh toán: <strong>${formatCurrencyVND(paidAmount)}</strong><br>
    Còn lại: <strong>${formatCurrencyVND(remain)}</strong>
  `;

  // lưu vào booking
  b.discountPercent = discountPercent;
  b.discountAmount  = discountAmount;
  b.decorFee        = decorFee;
  b.otherFee        = otherFee;
  b.guestCount      = guestCount;
  b.extraGuestFee   = extraGuestFee;
  b.paidAmount      = paidAmount;
  b.finalTotal      = total;
  b.remainAmount    = remain;
}

["cfGuestCount","cfDiscountPercent","cfDiscountAmount",
 "cfDecorFee","cfOtherFee","cfPaidAmount"].forEach(id => {
  document.getElementById(id).addEventListener("input", updateConfirmPriceSummary);
});

/* =========================================================
   13. SUBMIT PHIẾU XÁC NHẬN + GỬI LÊN GOOGLE SHEET
   ========================================================= */

document.getElementById("confirmForm").addEventListener("submit", function (e) {
  e.preventDefault();
  if (currentBookingIndex == null) {
    alert("Chưa có booking nào để xác nhận.");
    return;
  }

  const b = bookings[currentBookingIndex];
  const room  = rooms.find(r => r.id === b.roomId);
  const combo = combos.find(c => c.id === b.comboId);

  const name       = document.getElementById("cfCustomerName").value.trim();
  const phone      = document.getElementById("cfCustomerPhone").value.trim();
  const guestCount = getNumberInput("cfGuestCount") || 2;
  const paidStatus = document.getElementById("cfPaidStatus").value;
  const note       = document.getElementById("cfNote").value.trim();

  if (!phone) {
    alert("Vui lòng nhập số điện thoại khách.");
    return;
  }

  // chặn trùng khách: cùng SĐT + trùng thời gian ở bất kỳ phòng
  const start = b.checkIn;
  const end   = b.checkOut;
  const conflictCustomer = bookings.some((other, idx) => {
    if (idx === currentBookingIndex) return false;
    if (!other.customerPhone) return false;
    if (other.customerPhone !== phone) return false;
    return isOverlap(other.checkIn, other.checkOut, start, end);
  });

  if (conflictCustomer) {
    alert("Số điện thoại này đã có booking trùng thời gian. Vui lòng kiểm tra lại để tránh trùng khách.");
    return;
  }

  b.customerName   = name;
  b.customerPhone  = phone;
  b.guestCount     = guestCount;
  b.paidStatus     = paidStatus;
  b.note           = note;

  updateConfirmPriceSummary();

  const base           = b.baseTotal || 0;
  const discountPercent= b.discountPercent || 0;
  const discountAmount = b.discountAmount || 0;
  const decorFee       = b.decorFee || 0;
  const otherFee       = b.otherFee || 0;
  const extraGuestFee  = b.extraGuestFee || 0;
  const finalTotal     = b.finalTotal || base;
  const paidAmount     = b.paidAmount || 0;
  const remainAmount   = b.remainAmount || 0;

  const ci = new Date(b.checkIn);
  const co = new Date(b.checkOut);

  const paidStatusText = paidStatus === "du"
    ? "Đã thanh toán đủ."
    : `Đã thanh toán: ${formatCurrencyVND(paidAmount)}. Còn lại: ${formatCurrencyVND(remainAmount)}.`;

  const roomInfo = room ? `${room.name} – ${room.branch}` : b.roomId;

  const text = `XÁC NHẬN ĐẶT DREAMSS HOME
-Khách hàng anh/chị: ${name || "(chưa ghi tên)"} 
-Số điện thoại: ${phone} 
-Số lượng khách tối đa: ${guestCount} khách 
-Thời gian check in: ${formatTime(ci)} ngày ${ci.toLocaleDateString("vi-VN")}
-Thời gian check out: ${formatTime(co)} ngày ${co.toLocaleDateString("vi-VN")} 
-Loại homestay: ${roomInfo} (${combo ? combo.label : ""}) 
-Giá home (sau giảm và phụ thu): ${formatCurrencyVND(finalTotal)}

Chi tiết:
- Giá gốc: ${formatCurrencyVND(base)}
- Giảm giá % (${discountPercent}%): -${formatCurrencyVND((base * discountPercent) / 100)}
- Giảm giá cố định: -${formatCurrencyVND(discountAmount)}
- Phụ thu khách thứ 3 trở lên: ${formatCurrencyVND(extraGuestFee)}
- Phí trang trí: ${formatCurrencyVND(decorFee)}
- Phí khác: ${formatCurrencyVND(otherFee)}

${paidStatusText}
${note ? "Ghi chú: " + note + "\n" : ""}

Dreamss Home cảm ơn anh/chị vì đã tin tưởng và lựa chọn. Chúc anh/chị có những trải nghiệm tốt nhất tại home ạ🥰🥰🥰.`;

  document.getElementById("cfTextOutput").value = text;

  renderBookingList();

  // ===== GỬI LÊN GOOGLE SHEETS (Apps Script) DƯỚI DẠNG JSON =====
  const payload = {
    action: "saveBooking",
    branch: room ? room.branch : "",
    roomId: b.roomId,
    roomName: room ? room.name : "",
    combo: combo ? combo.label : b.comboId,
    checkIn: new Date(b.checkIn).toISOString(),
    checkOut: new Date(b.checkOut).toISOString(),
    cleaningEnd: new Date(b.cleaningEnd).toISOString(),

    customerName: name,
    phone: phone,
    guestCount: guestCount,

    baseTotal: base,
    finalTotal: finalTotal,
    discountPercent: discountPercent,
    discountAmount: discountAmount,
    decorFee: decorFee,
    otherFee: otherFee,
    extraGuestFee: extraGuestFee,
    paidAmount: paidAmount,
    paidStatus: paidStatus,
    note: note,
  };

  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.text())
    .then(t => {
      try {
        const json = JSON.parse(t);
        if (json.status === "SUCCESS") {
          alert("✅ Đã lưu booking vào Google Sheet + cập nhật khách hàng thân thiết.");
        } else {
          alert("❌ Booking đã tạo phiếu, nhưng lưu Google Sheet bị lỗi: " + t);
        }
      } catch (e) {
        alert("⚠️ Phản hồi từ server không đúng JSON: " + t);
      }
    })
    .catch(err => {
      console.error(err);
      alert("❌ Không gửi được booking lên Google Sheet. Kiểm tra lại mạng / Apps Script.");
    });
});

/* =========================================================
   14. LỊCH DỌN PHÒNG HOUSEKEEPING
   ========================================================= */

document.getElementById("cleaningForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const dateStr   = document.getElementById("cleaningDate").value;
  const container = document.getElementById("cleaningTable");
  container.innerHTML = "";

  if (!dateStr) {
    alert("Vui lòng chọn ngày cần xem lịch dọn.");
    return;
  }

  const dayStart = new Date(dateStr + "T00:00:00").getTime();
  const dayEnd   = dayStart + 24 * 60 * 60000;

  const list = bookings.filter(b =>
    b.cleaningEnd &&
    b.cleaningEnd > dayStart &&
    b.cleaningEnd <= dayEnd
  );

  if (list.length === 0) {
    container.innerHTML = "<p>Không có lịch dọn nào trong ngày này.</p>";
    return;
  }

  list.sort((a, b) => a.cleaningEnd - b.cleaningEnd);

  const table = document.createElement("table");
  const header = document.createElement("tr");
  header.innerHTML = "<th>Giờ dọn</th><th>Phòng</th><th>Chi nhánh</th><th>Khách</th><th>Ghi chú</th>";
  table.appendChild(header);

  list.forEach(b => {
    const tr = document.createElement("tr");
    const room = rooms.find(r => r.id === b.roomId);
    const co = new Date(b.checkOut);
    const cleaningEnd = new Date(b.cleaningEnd);

    const timeTd = document.createElement("td");
    timeTd.textContent = `${formatTime(co)} – ${formatTime(cleaningEnd)}`;

    const roomTd = document.createElement("td");
    roomTd.textContent = room ? room.name : b.roomId;

    const branchTd = document.createElement("td");
    branchTd.textContent = room ? room.branch : "";

    const customerTd = document.createElement("td");
    customerTd.textContent = b.customerName
      ? `${b.customerName} (${b.customerPhone || ""})`
      : "";

    const noteTd = document.createElement("td");
    noteTd.textContent = b.note || "";

    tr.appendChild(timeTd);
    tr.appendChild(roomTd);
    tr.appendChild(branchTd);
    tr.appendChild(customerTd);
    tr.appendChild(noteTd);
    table.appendChild(tr);
  });

  container.appendChild(table);
});

/* =========================================================
   15. GẮN EVENT CHO CÁC INPUT DỰ KIẾN GIÁ
   ========================================================= */

["roomSelect","comboSelect","checkIn","checkOut"].forEach(id => {
  document.getElementById(id).addEventListener("change", updatePricePreview);
});

/* =========================================================
   16. KHỞI TẠO
   ========================================================= */

populateSelectOptions();
renderBookingList();
updatePricePreview();
