let balance = 1000;
let growthRate = 0; // Pertumbuhan per detik
let chosenAsset = null;

// Fungsi untuk memilih aset
function chooseAsset(asset) {
  chosenAsset = asset;
  document.getElementById('chosen-asset').textContent = asset;

  if (asset === 'stock') {
    growthRate = 0.1; // 0.1% pertumbuhan per detik
  } else if (asset === 'crypto') {
    growthRate = 0.2; // 0.2% pertumbuhan per detik
  } else if (asset === 'realestate') {
    growthRate = 0.05; // 0.05% pertumbuhan per detik
  }

  document.getElementById('growth-rate').textContent = growthRate;
}

// Fungsi untuk menambah saldo setiap detik
setInterval(function() {
  if (chosenAsset) {
    balance += balance * (growthRate / 100);
    document.getElementById('balance').textContent = balance.toFixed(2);
  }
}, 1000);