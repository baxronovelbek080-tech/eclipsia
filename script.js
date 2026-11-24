
const ranks = [
    { name: "IMPERATOR", price: 85000, icon: "♛", color: "#ff414d" },
    { name: "GENERAL", price: 60000, icon: "♜", color: "#ff9900" },
    { name: "AFSONA", price: 48000, icon: "✦", color: "#ffcc22" },
    { name: "ELITA", price: 37000, icon: "♕", color: "#bd55ff" },
    { name: "TITAN", price: 29000, icon: "⚔", color: "#ff414d" },
    { name: "ALPOMISH", price: 22000, icon: "♞", color: "#9861ff" },
    { name: "FITSAR", price: 16000, icon: "✧", color: "#16cfff" },
    { name: "MARHAMON", price: 10500, icon: "♙", color: "#36e99a" },
    { name: "ASGAR", price: 6000, icon: "◆", color: "#8edaff" }
];

const grid = document.getElementById("rankGrid");

ranks.forEach((rank, index) => {
    const card = document.createElement("div");
    card.className = "rank-card" + (index === 0 ? " featured" : "");

    card.innerHTML = `
        <div class="rank-icon" style="color:${rank.color}">
            ${rank.icon}
        </div>
        <h3 style="color:${rank.color}">${rank.name}</h3>
        <div class="rank-price">
            ${rank.price.toLocaleString("uz-UZ")}
            <small>so'm</small>
        </div>
        <p class="rank-description">
            ${rank.name} rankini tanlang!
        </p>
        <button type="button">SOTIB OLISH ↗</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
        buyItem(rank.name, rank.price);
    });

    grid.appendChild(card);
});

const modal = document.getElementById("buyModal");

function buyItem(name, price) {
    document.getElementById("product").value = name;
    document.getElementById("amount").value = price;
    document.getElementById("selectedName").textContent = name;
    document.getElementById("selectedPrice").textContent =
        price.toLocaleString("uz-UZ") + " so'm";

    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
}

function copyIP() {
    navigator.clipboard.writeText("ARTICRAFT-UZ.PLAY.HOSTING")
        .then(() => alert("Server IP nusxalandi!"))
        .catch(() => alert("IP: ARTICRAFT-UZ.PLAY.HOSTING"));
}

document.getElementById("payment").addEventListener("change", function() {
    const info = document.getElementById("paymentInfo");

    const messages = {
        Click: "Click orqali to'lov. Admin to'lov havolasini ulashi kerak.",
        Payme: "Payme orqali to'lov. Admin integratsiyani sozlashi kerak.",
        Admin: "Admin bilan bog'lanib to'lovni kelishing."
    };

    info.textContent = messages[this.value] || "";
});

document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const order = {
        nickname: document.getElementById("nickname").value.trim(),
        product: document.getElementById("product").value,
        amount: document.getElementById("amount").value,
        payment: document.getElementById("payment").value,
        date: new Date().toLocaleString()
    };

    if (!order.nickname || !order.payment) {
        alert("Barcha joylarni to'ldiring!");
        return;
    }

    const orders = JSON.parse(
        localStorage.getItem("eclipsiaOrders") || "[]"
    );

    orders.push(order);
    localStorage.setItem("eclipsiaOrders", JSON.stringify(orders));

    alert("Demo buyurtma saqlandi!");

    this.reset();
    closeModal();
});
