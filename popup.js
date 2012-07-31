// PopupJs
//  - Requires jQuery

// Options
//  - nPosition: one of 17 possible positions in window.PopupPosition
//  - oElAxis  : element to be the axis of positioning
//  - xOffset (positive moves object to the RIGHT, negative moves to the LEFT)
//  - yOffset (position moves object DOWN, negative moves object UP)

// Does not take into account borders and margins
(function() {
    // Associative Array of Popup => Option
    var dPopupOptions = [];
    var sPopupDragHandleClass = 'popup-drag-handle';
    var nDefaultZIndex = 1000;
    
    var PopupPosition = window.PopupPosition = {
        // Positioning relative to the element
        BELOW_LEFT_ALIGN: 0,
        BELOW_RIGHT_ALIGN: 1,
        TOP_LEFT_ALIGN: 2,
        TOP_RIGHT_ALIGN: 3,
        LEFT_BOTTOM_ALIGN: 4,
        LEFT_TOP_ALIGN: 5,
        RIGHT_BOTTOM_ALIGN: 6,
        RIGHT_TOP_ALIGN: 7,
        
        // Positioning relative to document
        CENTER_SCREEN: 8,
        CENTER_TOP: 9,
        CENTER_BOTTOM: 10,
        CENTER_LEFT: 11,
        CENTER_RIGHT: 12,
        TOP_LEFT: 13,
        TOP_RIGHT: 14,
        BOTTOM_LEFT: 15,
        BOTTOM_RIGHT: 16
    };

    var Popup = window.Popup = {
        _convertObject: function(oPopup) {
            var jPopup = null;
            if (typeof(oPopup) === 'object') {
                jPopup = $(oPopup);
            } else {
                var jPopup = $(''+oPopup);
            }
            return jPopup;
        },
        
        _topBorder: function(jObject) {
            return parseInt(jObject.css('border-top-width'));
        },
        
        _bottomBorder: function(jObject) {
            return parseInt(jObject.css('border-bottom-width'));
        },
        
        _leftBorder: function(jObject) {
            return parseInt(jObject.css('border-left-width'));
        },
        
        _rightBorder: function(jObject) {
            return parseInt(jObject.css('border-right-width'));
        },
        
        _topPadding: function(jObject) {
            return parseInt(jObject.css('padding-top'));
        },
        
        _bottomPadding: function(jObject) {
            return parseInt(jObject.css('padding-bottom'));
        },
        
        _leftPadding: function(jObject) {
            return parseInt(jObject.css('padding-left'));
        },
        
        _rightPadding: function(jObject) {
            return parseInt(jObject.css('padding-right'));
        },
        
        _realWidth: function(jObject) {
            return jObject.width() +
                Popup._leftBorder(jObject) + Popup._rightBorder(jObject) +
                Popup._leftPadding(jObject) + Popup._rightPadding(jObject);
        },
        
        _realHeight: function(jObject) {
            return jObject.height() + 
                Popup._topBorder(jObject) + Popup._bottomBorder(jObject) +
                Popup._topPadding(jObject) + Popup._bottomPadding(jObject);
        },
    
        // Returns true if correct input, false otherwise
        manage: function(oPopup, oOptions) {
            var jPopup = Popup._convertObject(oPopup);
            if (jPopup) {
                dPopupOptions[jPopup] = oOptions;
            } else {
                throw '' + oPopup + ' could not be found!';
            }
        },
        
        // Assumes the closest non-static-ally positioned parent is the document itself
        show: function(oPopup, oOptions) {
            var jPopup = Popup._convertObject(oPopup);
            if (oOptions === null) {
                oOptions = dPopupOptions[jPopup];
            } else {
                Popup.manage(oPopup, oOptions);
            }
            
            // Default to center screen
            if (oOptions === null) {
                oOptions = { nPosition: PopupPosition.CENTER_SCREEN };
                Popup.manage(oPopup, oOptions);
            }
            
            // Discard whatever position was here before. These are popups.
            jPopup.css('position', 'absolute')
                .css('z-index', nDefaultZIndex);
            
            var jAxis = Popup._convertObject(oOptions.oElAxis);
            if ((jAxis.length <= 0) && (oOptions.nPosition < CENTER_SCREEN)) {
                throw "Cannot position relative to null element";
            }
            
            var newLeft = null;
            var newTop = null;
            switch(oOptions.nPosition)
            {
                case PopupPosition.BELOW_LEFT_ALIGN:
                    newLeft = jAxis.offset().left;
                    newTop = jAxis.offset().top + Popup._realHeight(jAxis);
                    break;
                case PopupPosition.BELOW_RIGHT_ALIGN:
                    newLeft = jAxis.offset().left - Popup._realWidth(jPopup) + Popup._realWidth(jAxis);
                    newTop = jAxis.offset().top + Popup._realHeight(jAxis);
                    break;
                case PopupPosition.TOP_LEFT_ALIGN:
                    newLeft = jAxis.offset().left;
                    newTop = jAxis.offset().top - Popup._realHeight(jPopup);
                    break;
                case PopupPosition.TOP_RIGHT_ALIGN:
                    newLeft = jAxis.offset().left - Popup._realWidth(jPopup) + Popup._realWidth(jAxis);
                    newTop = jAxis.offset().top - Popup._realHeight(jPopup);
                    break;
            }
            
            // Optionally add the offsets
            if (oOptions.xOffset) {
                newLeft += oOptions.xOffset;
            }
            if (oOptions.yOffset) {
                newTop += oOptions.yOffset;
            }

            // Always show on screen
            newLeft = Math.max(newLeft, 0);
            newLeft = Math.min(newLeft, $(document).width() - Popup._realWidth(jPopup));
            newTop = Math.max(newTop, 0);
            newTop = Math.min(newTop, $(document).height() - jPopup.height());
            
            jPopup.css('left', newLeft)
                .css('top', newTop)
                .show();
        },
    };
})();