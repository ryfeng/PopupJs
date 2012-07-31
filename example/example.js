(function() {
    $(document).ready(function() {
        $('#bl').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.BELOW_LEFT_ALIGN,
                allowDrag: true,
                draghandle: ''
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
        $('#lb').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.LEFT_BOTTOM_ALIGN
            });
        });
        $('#lt').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.LEFT_TOP_ALIGN
            });
        });
        $('#rb').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.RIGHT_BOTTOM_ALIGN
            });
        });
        $('#rt').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.RIGHT_TOP_ALIGN
            });
        });
        $('#cs').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.CENTER_SCREEN
            });
        });
        $('#ct').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.CENTER_TOP
            });
        });
        $('#cb').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.CENTER_BOTTOM
            });
        });
        $('#cl').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.CENTER_LEFT
            });
        });
        $('#cr').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.CENTER_RIGHT
            });
        });
        $('#slt').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.TOP_LEFT
            });
        });
        $('#srt').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.TOP_RIGHT
            });
        });
        $('#slb').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.BOTTOM_LEFT
            });
        });
        $('#srb').click(function() {
            window.Popup.show('#popup', {
                oElAxis: $('#axis'),
                nPosition: window.PopupPosition.BOTTOM_RIGHT
            });
        });
    });
})();