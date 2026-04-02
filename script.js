// script.js
let currentUser = null;
let subtotal = 0;
let gstTotal = 0;
let currentCategory = "xerox";
let billItems = [];
let currentInvoiceNo = "";
let currentDateStr = "";

// Branch Data Configurations
const branchData = {
  branch1: {
    name: "SRI SATHYA XEROX",
    tagline: "XEROX - STATIONERY & GOVT. APPROVED E-SEVA",
    address: "9/6, Metha Layout, Anna Nagar, Peelamedu, Coimbatore - 641 004",
    phones: "95667 50356, 93842 67497, 97914 46895",
    email: "srisathyaxerox01@gmail.com",
    gstin: "33BMQPN0425H2Z3"
  },
  branch2: {
    name: "SRI SATHYA XEROX",
    tagline: "XEROX - STATIONERY & GOVT. APPROVED E-SEVA",
    address: "23A, Kuchinaidu Layout, Masakalipalayam Road, Peelamedu, Coimbatore - 641 004",
    phones: "0422 - 4774419, 94878 52522, 97914 46895, 90251 51228",
    email: "srisathyaxerox02@gmail.com",
    gstin: "33BMQPN0425H2Z3"
  }
};

// Global Mobile Country Codes
const countryDialCodes = [
  { c: "IN", d: "91" }, { c: "US", d: "1" }, { c: "GB", d: "44" }, { c: "AE", d: "971" }, { c: "SA", d: "966" },
  { c: "AF", d: "93" }, { c: "AL", d: "355" }, { c: "DZ", d: "213" }, { c: "AD", d: "376" }, { c: "AO", d: "244" },
  { c: "AR", d: "54" }, { c: "AM", d: "374" }, { c: "AU", d: "61" }, { c: "AT", d: "43" }, { c: "AZ", d: "994" },
  { c: "BH", d: "973" }, { c: "BD", d: "880" }, { c: "BY", d: "375" }, { c: "BE", d: "32" }, { c: "BT", d: "975" },
  { c: "BO", d: "591" }, { c: "BA", d: "387" }, { c: "BR", d: "55" }, { c: "BG", d: "359" }, { c: "KH", d: "855" },
  { c: "CM", d: "237" }, { c: "CA", d: "1" }, { c: "CF", d: "236" }, { c: "TD", d: "235" }, { c: "CL", d: "56" },
  { c: "CN", d: "86" }, { c: "CO", d: "57" }, { c: "CR", d: "506" }, { c: "HR", d: "385" }, { c: "CU", d: "53" },
  { c: "CY", d: "357" }, { c: "CZ", d: "420" }, { c: "DK", d: "45" }, { c: "EG", d: "20" }, { c: "SV", d: "503" },
  { c: "EE", d: "372" }, { c: "ET", d: "251" }, { c: "FI", d: "358" }, { c: "FR", d: "33" }, { c: "GE", d: "995" },
  { c: "DE", d: "49" }, { c: "GH", d: "233" }, { c: "GR", d: "30" }, { c: "GT", d: "502" }, { c: "HT", d: "509" },
  { c: "HN", d: "504" }, { c: "HK", d: "852" }, { c: "HU", d: "36" }, { c: "IS", d: "354" }, { c: "ID", d: "62" },
  { c: "IR", d: "98" }, { c: "IQ", d: "964" }, { c: "IE", d: "353" }, { c: "IL", d: "972" }, { c: "IT", d: "39" },
  { c: "JM", d: "1876" }, { c: "JP", d: "81" }, { c: "JO", d: "962" }, { c: "KZ", d: "7" }, { c: "KE", d: "254" },
  { c: "KP", d: "850" }, { c: "KR", d: "82" }, { c: "KW", d: "965" }, { c: "LB", d: "961" }, { c: "LY", d: "218" },
  { c: "MY", d: "60" }, { c: "MV", d: "960" }, { c: "MT", d: "356" }, { c: "MX", d: "52" }, { c: "MC", d: "377" },
  { c: "MA", d: "212" }, { c: "MM", d: "95" }, { c: "NP", d: "977" }, { c: "NL", d: "31" }, { c: "NZ", d: "64" },
  { c: "NG", d: "234" }, { c: "NO", d: "47" }, { c: "OM", d: "968" }, { c: "PK", d: "92" }, { c: "PA", d: "507" },
  { c: "PY", d: "595" }, { c: "PE", d: "51" }, { c: "PH", d: "63" }, { c: "PL", d: "48" }, { c: "PT", d: "351" },
  { c: "QA", d: "974" }, { c: "RO", d: "40" }, { c: "RU", d: "7" }, { c: "SG", d: "65" }, { c: "ZA", d: "27" },
  { c: "ES", d: "34" }, { c: "LK", d: "94" }, { c: "SE", d: "46" }, { c: "CH", d: "41" }, { c: "TW", d: "886" },
  { c: "TH", d: "66" }, { c: "TR", d: "90" }, { c: "UA", d: "380" }, { c: "UY", d: "598" }, { c: "VE", d: "58" },
  { c: "VN", d: "84" }, { c: "YE", d: "967" }, { c: "ZM", d: "260" }, { c: "ZW", d: "263" }
];

// DEFAULT ITEMS
const items = {
  xerox: {
    "Xerox B/W A4 (Single Side)": 2,
    "Xerox B/W A4 (Back-to-Back)": 3,
    "Xerox Color A4": 10,
    "Xerox B/W A3": 10,
    "Xerox Color A3": 30,
    "Lamination (ID Card)": 20,
    "Lamination (A4)": 30,
    "Spiral Binding": 50,
    "Printout (Color)": 15
  },
  stationery: {
    "XO Pen": 10,
    "Fighter Flair": 10,
    "Flair Glow Pen": 10,
    "Flair Breeze": 20,
    "Joy Pen": 5,
    "Classmate Spin Pen": 10,
    "Yolo Pen": 10,
    "A4 Paper Rim (JK Copier)": 280,
    "Stapler (Small)": 40,
    "M Choki Rs.10 Stix (Jar)": 180,
    "Flair Mojo Pen": 5,
    "Flair Glass Gel Pen": 10,
    "Flair Liquid GT Pen Set": 100,
    "Flair Woody B.Pen": 10,
    "Flair Sunny Ball Pen (Pack)": 30,
    "Reynolds Racer Gel Blue": 10,
    "Reynolds Racer Gel Black": 10,
    "Reynolds Racer Gel Red": 10,
    "Reynolds Jetter Metallic FX Blue": 50,
    "Reynolds Jetter Aerosoft Blue": 30,
    "Reynolds 045 Fine Carbure Blue": 10,
    "Reynolds 045 Fine Carbure Black": 10,
    "Reynolds 045 Fine Carbure Red": 10,
    "Reynolds Correction Pen": 30,
    "Reynolds Glue Stick 6gm": 15,
    "Reynolds Glue Stick 8g": 25,
    "Reynolds Jetter Refill Blue": 10,
    "DOMS Note 1177": 59,
    "DOMS Note 1335": 30,
    "DOMS Note 8006": 40,
    "DOMS Note 8002": 28,
    "DOMS Pen Inxglo": 10,
    "DOMS Pen Xclusive": 12,
    "DOMS Pen Mirco": 5
  }
};

// LOAD SAVED
let savedItems = JSON.parse(localStorage.getItem("customItems")) || [];

// --- AUTHENTICATION SYSTEM ---
function checkLoginStatus() {
    let empSelect = document.getElementById("reportEmpFilter");
    if (!empSelect.querySelector("option[value='emp1']")) {
        for(let i=1; i<=10; i++) {
            let opt = document.createElement("option"); opt.value = "emp"+i; opt.text = "Employee "+i;
            empSelect.add(opt);
        }
    }
    
    let savedSession = localStorage.getItem("currentUser");
    if(savedSession) {
        currentUser = JSON.parse(savedSession);
        loginSuccess();
    } else {
        document.getElementById("loginOverlay").classList.remove("hidden");
    }
}

function attemptLogin() {
    let u = document.getElementById("loginUsername").value.trim().toLowerCase();
    let p = document.getElementById("loginPassword").value;
    let err = document.getElementById("loginError");
    let adminPass = localStorage.getItem("adminPassword") || "Sharanraj@18";
    
    if (u === "admin" && p === adminPass) {
        currentUser = { id: "admin", role: "admin" };
    } else if (u.startsWith("emp")) {
        let empNum = parseInt(u.replace("emp", ""));
        if (empNum >= 1 && empNum <= 10 && p === `${u}@ss`) {
            currentUser = { id: u, role: "employee" };
        }
    }
    
    if (currentUser) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        loginSuccess();
    } else {
        err.classList.remove("hidden");
    }
}

function loginSuccess() {
    document.getElementById("loginOverlay").classList.add("hidden");
    document.getElementById("currentUserLabel").innerText = `(${currentUser.id})`;
    document.getElementById("loginError").classList.add("hidden");
    
    if (currentUser.role === "admin") {
        document.getElementById("adminSettingsBtn").classList.remove("hidden");
        document.getElementById("adminFilterDiv").classList.remove("hidden");
    } else {
        document.getElementById("adminSettingsBtn").classList.add("hidden");
        document.getElementById("adminFilterDiv").classList.add("hidden");
    }
    
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
    
    if (!document.getElementById("reportsModal").classList.contains("hidden")) loadReports();
}

function logout() {
    currentUser = null;
    localStorage.removeItem("currentUser");
    document.getElementById("loginOverlay").classList.remove("hidden");
    document.getElementById("reportsModal").classList.add("hidden");
}

function openAdminSettings() { document.getElementById("adminSettingsModal").classList.remove("hidden"); }

function saveAdminPassword() {
    let p = document.getElementById("newAdminPassword").value;
    if(p.length < 4) return alert("Password too short");
    localStorage.setItem("adminPassword", p);
    document.getElementById("newAdminPassword").value = "";
    document.getElementById("adminSettingsModal").classList.add("hidden");
    alert("Admin password updated successfully!");
}

// INITIALIZE APP
function initApp() {
  checkLoginStatus();

  // Load Country Codes
  const codeSelect = document.getElementById("countryCode");
  codeSelect.innerHTML = "";
  countryDialCodes.forEach(country => {
      let option = document.createElement("option");
      option.value = country.d;
      option.text = `+${country.d} (${country.c})`;
      if (country.c === "IN") option.selected = true;
      codeSelect.add(option);
  });

  loadItems();
  generateInvoiceNo();
  updateDate();
  changeBranch(); // Load initial branch header
  renderBill();

  // Bind event listeners for customer details
  document.getElementById("customerName").addEventListener("input", function (e) {
    document.getElementById("receiptCustomerName").innerText = e.target.value.trim() || 'Cash Customer';
  });

  function updateReceiptMobile() {
    let mobile = document.getElementById("customerMobile").value.trim();
    let code = document.getElementById("countryCode").value;
    document.getElementById("receiptCustomerMobile").innerText = mobile ? `Ph: +${code} ${mobile}` : '';
  }

  document.getElementById("customerMobile").addEventListener("input", updateReceiptMobile);
  document.getElementById("countryCode").addEventListener("change", updateReceiptMobile);
}

function generateInvoiceNo() {
  let counter = localStorage.getItem("invoiceCounter");
  if (!counter) counter = 10001; // Start at 10001 if first time
  currentInvoiceNo = counter.toString();
  document.getElementById("receiptInvoiceNoStr").textContent = `INVOICE NO: ${counter}`;
}

function updateDate() {
  const d = new Date();
  currentDateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  document.getElementById("receiptDateStr").textContent = currentDateStr;
}

// BRANCH MANAGEMENT
function changeBranch() {
  const selected = document.getElementById("branchSelector").value;
  const data = branchData[selected];

  document.getElementById("receiptHeaderCompanyName").textContent = data.name;

  // Render bottom contact section dynamically
  document.getElementById("contactPhones").textContent = data.phones;
  document.getElementById("contactEmail").textContent = data.email;
  document.getElementById("contactAddress").textContent = data.address;
  document.getElementById("gstinValue").textContent = data.gstin;
}

// LOAD POS ITEMS DROPDOWN
function loadItems() {
  let select = document.getElementById("item");
  select.innerHTML = "";

  Object.keys(items[currentCategory]).forEach(item => {
    let option = document.createElement("option");
    option.text = item;
    select.add(option);
  });

  savedItems.forEach(obj => {
    let option = document.createElement("option");
    option.text = obj.name;
    select.add(option);
  });

  // Auto fill first item
  autoFillPrice();
}

// CATEGORY SWITCH
function setCategory(cat, btn) {
  currentCategory = cat;
  loadItems();

  document.querySelectorAll(".tab").forEach(b => {
    b.classList.remove("active-tab", "text-white", "bg-blue-600", "hover:bg-blue-700");
    b.classList.add("bg-white", "text-gray-600", "hover:bg-gray-50");
  });

  btn.classList.remove("bg-white", "text-gray-600", "hover:bg-gray-50");
  btn.classList.add("active-tab", "bg-blue-600", "text-white", "hover:bg-blue-700");
}

// SEARCH
function filterItems() {
  let search = document.getElementById("search").value.toLowerCase();
  let select = document.getElementById("item");

  select.innerHTML = "";

  Object.keys(items[currentCategory]).forEach(item => {
    if (item.toLowerCase().includes(search)) {
      let option = document.createElement("option");
      option.text = item;
      select.add(option);
    }
  });

  savedItems.forEach(obj => {
    if (obj.name.toLowerCase().includes(search)) {
      let option = document.createElement("option");
      option.text = obj.name;
      select.add(option);
    }
  });
  // Fill if available
  if (select.options.length > 0) autoFillPrice();
}

// AUTO PRICE
function autoFillPrice() {
  let itemSelect = document.getElementById("item");
  if (!itemSelect.value) return;

  let item = itemSelect.value;

  if (items[currentCategory] && items[currentCategory][item]) {
    document.getElementById("price").value = items[currentCategory][item];
  } else {
    let found = savedItems.find(x => x.name === item);
    if (found) {
      document.getElementById("price").value = found.price;
    }
  }
}

// SAVE CUSTOM ITEM
function saveCustomItem() {
  let name = document.getElementById("customItem").value.trim();

  if (!name) return alert("Enter custom item name");

  let price = parseFloat(prompt("Enter standard price for " + name + " (₹):", "10"));
  if (isNaN(price) || price <= 0) return alert("Invalid price. Item not saved.");

  // Check if exists
  if (savedItems.find(x => x.name === name)) {
    return alert("Item already exists in memory");
  }

  savedItems.push({ name, price });
  localStorage.setItem("customItems", JSON.stringify(savedItems));

  document.getElementById("customItem").value = "";
  loadItems();

  alert(name + " Saved to Custom Items ✅");
}

// ADD ITEM TO BILL
function addItem() {
  let item = document.getElementById("item").value;
  let price = parseFloat(document.getElementById("price").value);
  let qty = parseInt(document.getElementById("qty").value);

  let discountType = document.getElementById("discountType").value;
  let discountValue = parseFloat(document.getElementById("discountValue").value) || 0;

  if (!item) return alert("Select an item.");
  if (isNaN(price) || price <= 0) return alert("Enter a valid price.");
  if (isNaN(qty) || qty <= 0) return alert("Enter a valid quantity (min 1).");

  let base = price * qty;

  let discount = 0;
  if (discountType === "amount") discount = discountValue;
  if (discountType === "percent") discount = base * (discountValue / 100);

  // Prevent over-discounting
  if (discount > base) discount = base;

  let afterDiscount = base - discount;
  let gst = afterDiscount * 0.18; // We calculate final GST on subtotal, but it's good to know line details
  let totalLinePrice = afterDiscount;

  billItems.push({
    item, qty, price, discount, afterDiscount
  });

  // Reset qty and discount inputs for next add
  document.getElementById("qty").value = "";
  document.getElementById("discountValue").value = "";
  document.getElementById("discountType").value = "none";
  document.getElementById("search").value = ""; // clear search
  filterItems(); // reset search

  renderBill();

  // Scroll to bottom of receipt
  const receiptContainer = document.getElementById("receiptDocument").parentElement;
  receiptContainer.scrollTop = receiptContainer.scrollHeight;
}

// REMOVE ITEM
function removeItem(index) {
  billItems.splice(index, 1);
  renderBill();
}

// RENDER BILL
function renderBill() {
  let listHTML = "";
  subtotal = 0;

  if (billItems.length === 0) {
    document.getElementById("emptyCart").classList.remove("hidden");
  } else {
    document.getElementById("emptyCart").classList.add("hidden");
  }

  billItems.forEach((row, i) => {
    subtotal += row.afterDiscount;
    listHTML += `
        <tr class="hover:bg-gray-100 text-gray-800 transition">
            <td class="py-2.5 px-2 border-b border-gray-100 text-center font-medium">${i + 1}</td>
            <td class="py-2.5 px-2 border-b border-gray-100 font-bold max-w-[200px] truncate break-words">${row.item}</td>
            <td class="py-2.5 px-2 border-b border-gray-100 text-center font-medium">${row.qty}</td>
            <td class="py-2.5 px-2 border-b border-gray-100 text-right border-l border-dashed border-gray-200">₹${row.price.toFixed(2)}</td>
            <td class="py-2.5 px-2 border-b border-gray-100 text-right text-red-500 font-medium">${row.discount > 0 ? '-₹' + row.discount.toFixed(2) : '-'}</td>
            <td class="py-2.5 px-2 border-b border-gray-100 text-right font-black text-gray-900">₹${row.afterDiscount.toFixed(2)}</td>
            <td class="py-2.5 px-2 border-b border-gray-100 text-center no-print border-l border-dashed border-gray-200">
                <button onclick="removeItem(${i})" class="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-full transition mx-auto flex" title="Remove Item">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </td>
        </tr>`;
  });

  document.getElementById("list").innerHTML = listHTML;

  let gstEnabled = document.getElementById("gstToggle").checked;
  if (gstEnabled) {
    gstTotal = subtotal * 0.18;
    document.getElementById("gstRow").style.display = "flex";
    document.getElementById("receiptGSTIN").style.display = "inline-block";
  } else {
    gstTotal = 0;
    document.getElementById("gstRow").style.display = "none";
    document.getElementById("receiptGSTIN").style.display = "none";
  }

  let grandTotal = subtotal + gstTotal;

  document.getElementById("subtotal").innerText = "₹ " + subtotal.toFixed(2);
  document.getElementById("gstTotal").innerText = "₹ " + gstTotal.toFixed(2);
  document.getElementById("total").innerText = "₹ " + Math.round(grandTotal).toFixed(2);
}

// TOGGLE GST
function toggleGST() {
  renderBill();
}

// SAVE TRANSACTION
function saveTransaction() {
  let transactions = JSON.parse(localStorage.getItem("dailyTransactions")) || [];
  let invoiceNo = currentInvoiceNo;

  // Prevent duplicated saves if printed twice
  if (transactions.some(t => t.invoiceNo === invoiceNo)) return;

  let transaction = {
    date: new Date().toISOString(),
    invoiceNo: invoiceNo,
    customer: document.getElementById("customerName").value.trim() || "Cash Customer",
    subtotal: subtotal,
    gst: gstTotal,
    total: Math.round(subtotal + gstTotal),
    createdBy: currentUser ? currentUser.id : "unknown",
    deleted: false
  };

  transactions.push(transaction);
  localStorage.setItem("dailyTransactions", JSON.stringify(transactions));
  
  // Increment the sequential invoice counter for the next bill
  let currentCounter = parseInt(localStorage.getItem("invoiceCounter") || "10001");
  localStorage.setItem("invoiceCounter", currentCounter + 1);
}

// CLEAR BILL
function clearBill() {
  if (billItems.length === 0) return;
  if (confirm("Are you sure you want to clear the entire bill?")) {
    billItems = [];
    document.getElementById("customerName").value = "";
    document.getElementById("customerMobile").value = "";
    document.getElementById("receiptCustomerName").innerText = "Cash Customer";
    document.getElementById("receiptCustomerMobile").innerText = "";
    updateDate();
    generateInvoiceNo();
    renderBill();
  }
}

// PRINT
function printReceipt() {
  if (billItems.length === 0) {
    alert("Cannot print an empty bill! Please add items.");
    return;
  }
  saveTransaction();
  window.print();
}

// SEND WHATSAPP
function sendWhatsApp() {
  if (billItems.length === 0) {
    alert("Cannot send an empty bill. Please add items.");
    return;
  }
  
  let countryCode = document.getElementById("countryCode").value;
  let mobile = document.getElementById("customerMobile").value.replace(/\s+/g, '');
  
  if (!mobile) {
    alert("Please enter the customer's Mobile Number in the Left Panel first.");
    return;
  }
  
  let fullMobile = countryCode + mobile;

  let customerName = document.getElementById("customerName").value.trim() || "Customer";
  let invoiceNo = currentInvoiceNo;
  let dateStr = currentDateStr;
  let companyName = document.getElementById("receiptHeaderCompanyName").textContent;
  
  let msg = `*${companyName}*\n`;
  msg += `--------------------------\n`;
  msg += `*Invoice No:* ${invoiceNo}\n`;
  msg += `*Date:* ${dateStr}\n\n`;
  msg += `Hi ${customerName},\nHere is your bill summary:\n\n`;
  
  billItems.forEach((row, i) => {
    msg += `${i+1}. ${row.item} (x${row.qty}) - ₹${row.afterDiscount.toFixed(2)}\n`;
  });
  
  msg += `\n*Subtotal:* ₹${subtotal.toFixed(2)}\n`;
  
  let gstEnabled = document.getElementById("gstToggle").checked;
  if (gstEnabled && gstTotal > 0) {
      msg += `*Tax (18%):* ₹${gstTotal.toFixed(2)}\n`;
  }
  
  let grandTotal = Math.round(subtotal + gstTotal);
  msg += `*Grand Total:* ₹${grandTotal.toFixed(2)}\n`;
  
  msg += `\nThank you for shopping with us! 🙏`;
  
  let encodedMsg = encodeURIComponent(msg);
  let whatsappUrl = `https://wa.me/${fullMobile}?text=${encodedMsg}`;
  
  // Save the transaction on send as well to record the sale
  saveTransaction(); 
  
  window.open(whatsappUrl, '_blank');
}

// DAILY REPORTS MANAGER
function openReportsModal() {
  document.getElementById("reportsModal").classList.remove("hidden");
  document.getElementById("reportDate").valueAsDate = new Date();
  loadReports();
}

function closeReportsModal() {
  document.getElementById("reportsModal").classList.add("hidden");
}

function loadReports() {
  const selectedDateStr = document.getElementById("reportDate").value;
  let transactions = JSON.parse(localStorage.getItem("dailyTransactions")) || [];

  let filtered = transactions.filter(t => t.date.startsWith(selectedDateStr));
  
  if (currentUser && currentUser.role === "admin") {
      let empFilter = document.getElementById("reportEmpFilter").value;
      if (empFilter !== "ALL") {
          filtered = filtered.filter(t => t.createdBy === empFilter);
      }
  } else {
      // Employees only see THEIR active bills
      filtered = filtered.filter(t => t.createdBy === currentUser.id && !t.deleted);
  }

  let html = "";
  let totalSales = 0;

  filtered.forEach(t => {
    let time = new Date(t.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (!t.deleted) totalSales += t.total;
    
    let isDeleted = t.deleted;
    let rowClass = isDeleted ? "bg-red-50 opacity-70" : "hover:bg-gray-50";
    let textClass = isDeleted ? "line-through text-red-500" : "text-[#1e2759]";
    
    let actionBtn = "";
    if (currentUser && currentUser.role === "admin") {
        if (isDeleted) {
            actionBtn = `<button onclick="restoreTransaction('${t.invoiceNo}')" class="text-xs bg-green-500 text-white px-2 py-1 rounded font-bold hover:bg-green-600">Restore</button>`;
        } else {
            actionBtn = `<button onclick="deleteTransaction('${t.invoiceNo}')" class="text-xs bg-red-500 text-white px-2 py-1 rounded font-bold hover:bg-red-600">Delete</button>`;
        }
    } else {
        // Employee
        actionBtn = `<button onclick="deleteTransaction('${t.invoiceNo}')" class="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 rounded font-bold px-2 py-1 transition scale-125">🗑️</button>`;
    }
    
    let adminMeta = "";
    if (currentUser && currentUser.role === "admin") {
        adminMeta = `<div class="text-[10px] text-gray-500 uppercase mt-0.5">By: ${t.createdBy}</div>`;
        if (isDeleted) adminMeta += `<div class="text-[10px] text-red-600 font-bold uppercase mt-0.5">Del By: ${t.deletedBy}</div>`;
    }

    html += `
            <tr class="${rowClass} border-b">
                <td class="p-3 text-xs font-semibold text-gray-500">${time}</td>
                <td class="p-3 font-bold ${textClass}">${t.invoiceNo} ${adminMeta}</td>
                <td class="p-3 font-medium">${t.customer}</td>
                <td class="p-3 text-right">₹${t.subtotal.toFixed(2)}</td>
                <td class="p-3 text-right">₹${t.gst.toFixed(2)}</td>
                <td class="p-3 text-right font-black ${isDeleted ? 'text-red-500 line-through' : 'text-green-700'}">₹${t.total.toFixed(2)}</td>
                <td class="p-3 text-center no-print">${actionBtn}</td>
            </tr>
        `;
  });

  document.getElementById("reportsList").innerHTML = html;
  document.getElementById("reportTotalSales").innerText = "₹ " + totalSales.toFixed(2);

  if (filtered.length === 0) {
    document.getElementById("noReports").classList.remove("hidden");
    document.getElementById("reportsTable").classList.add("hidden");
  } else {
    document.getElementById("noReports").classList.add("hidden");
    document.getElementById("reportsTable").classList.remove("hidden");
  }
}

function deleteTransaction(invoiceNo) {
    if(!confirm("Are you sure you want to delete this bill?")) return;
    let transactions = JSON.parse(localStorage.getItem("dailyTransactions")) || [];
    let t = transactions.find(x => x.invoiceNo === invoiceNo);
    if(t) {
        t.deleted = true;
        t.deletedBy = currentUser.id;
        localStorage.setItem("dailyTransactions", JSON.stringify(transactions));
        loadReports();
    }
}

function restoreTransaction(invoiceNo) {
    let transactions = JSON.parse(localStorage.getItem("dailyTransactions")) || [];
    let t = transactions.find(x => x.invoiceNo === invoiceNo);
    if(t) {
        t.deleted = false;
        delete t.deletedBy;
        localStorage.setItem("dailyTransactions", JSON.stringify(transactions));
        loadReports();
    }
}

function exportToCSV() {
  const selectedDateStr = document.getElementById("reportDate").value;
  let transactions = JSON.parse(localStorage.getItem("dailyTransactions")) || [];
  let filtered = transactions.filter(t => t.date.startsWith(selectedDateStr));

  if (filtered.length === 0) return alert("No reports to export for this date.");

  let csv = "Time,Invoice No,Customer,Subtotal,GST,Grand Total,Status,CreatedBy,DeletedBy\n";
  filtered.forEach(t => {
    let time = new Date(t.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let status = t.deleted ? "Deleted" : "Active";
    csv += `"${time}","${t.invoiceNo}","${t.customer}",${t.subtotal},${t.gst},${t.total},${status},${t.createdBy},${t.deletedBy || ''}\n`;
  });

  let blob = new Blob([csv], { type: "text/csv" });
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", `SRI_SATHYA_REPORT_${selectedDateStr}.csv`);
  a.click();
}

// Run init on load
initApp();