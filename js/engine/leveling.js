export default {
    itemStatus: function (level) {
        return Math.ceil(this.itemFactor() * (level / 10))
    },

    itemFactor: function () {
        let value = Math.floor((Math.random() * 10) + 1);

        if (value > 5 && Math.random() > 0.5) value = Math.floor(Math.random() * 5) + 1;
        if (value > 7 && Math.random() > 0.6) value = Math.floor(Math.random() * 7) + 1;
        if (value > 9 && Math.random() > 0.7) value = Math.floor(Math.random() * 9) + 1;

        return value;
    }
}
