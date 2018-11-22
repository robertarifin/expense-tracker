function formatCurrency(price) {
    return `Rp. ${new Intl.NumberFormat(['id'], { maximumSignificantDigits: 3 }).format(price)}` ;
}

module.exports = formatCurrency