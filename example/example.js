(function() {
    $(document).ready(function() {
        $('#bl').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.BELOW_LEFT_ALIGN
            });
        });
        $('#br').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.BELOW_RIGHT_ALIGN
            });
        });
        $('#tl').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.TOP_LEFT_ALIGN
            });
        });
        $('#tr').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.TOP_RIGHT_ALIGN
            });
        });
    });
})();