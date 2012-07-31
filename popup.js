// PopupJs
//  - Requires jQuery

// Does not take into account borders and margins
(function() {
    // Associative Array of Popup => Option
    var lsPopups = [];
    var sPopupDragHandleClass = 'popup-drag-handle';
    var nDefaultZIndex = 1000;
    var popupId = 0;
    
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
                if (jPopup.data('popupId') === undefined) {
                    jPopup.data('popupId', popupId++);
                    lsPopups.push(jPopup);
                }
                jPopup.data('popup-options', oOptions);
            } else {
                throw '' + oPopup + ' could not be found!';
            }
        },
        
        // Assumes the closest non-static-ally positioned parent is the document itself
        show: function(oPopup, oOptions) {
            var jPopup = Popup._convertObject(oPopup);
            if (!jPopup) {
                throw '' + oPopup + ' could not be found!';
            }
            
            if (!oOptions) {
                oOptions = jPopup.data('popup-options');
            } else {
                Popup.manage(oPopup, oOptions);
            }
            
            // Default to center screen
            if (!oOptions) {
                oOptions = { nPosition: PopupPosition.CENTER_SCREEN };
                Popup.manage(oPopup, oOptions);
            }
            
            // Discard whatever position was here before. These are popups.
            jPopup.css('position', 'absolute')
                .css('z-index', nDefaultZIndex)
                .css('width', jPopup.width());
            
            var jAxis = Popup._convertObject(oOptions.oElAxis);
            if ((jAxis.length <= 0) && (oOptions.nPosition < PopupPosition.CENTER_SCREEN)) {
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
                case PopupPosition.LEFT_BOTTOM_ALIGN:
                    newLeft = jAxis.offset().left - Popup._realWidth(jPopup);
                    newTop = jAxis.offset().top - Popup._realHeight(jPopup) + Popup._realHeight(jAxis);
                    break;
                case PopupPosition.LEFT_TOP_ALIGN:
                    newLeft = jAxis.offset().left - Popup._realWidth(jPopup);
                    newTop = jAxis.offset().top;
                    break;
                case PopupPosition.RIGHT_BOTTOM_ALIGN:
                    newLeft = jAxis.offset().left + Popup._realWidth(jAxis);
                    newTop = jAxis.offset().top - Popup._realHeight(jPopup) + Popup._realHeight(jAxis);
                    break;
                case PopupPosition.RIGHT_TOP_ALIGN:
                    newLeft = jAxis.offset().left + Popup._realWidth(jAxis);
                    newTop = jAxis.offset().top;
                    break;
                case PopupPosition.CENTER_SCREEN:
                    newLeft = ($(window).width() - Popup._realWidth(jPopup)) / 2;
                    newTop = ($(window).height() - Popup._realHeight(jPopup)) / 2;
                    break;
                case PopupPosition.CENTER_TOP:
                    newLeft = ($(window).width() - Popup._realWidth(jPopup)) / 2;
                    newTop = 0;
                    break;
                case PopupPosition.CENTER_BOTTOM:
                    newLeft = ($(window).width() - Popup._realWidth(jPopup)) / 2;
                    newTop = $(window).height() - Popup._realHeight(jPopup);
                    break;
                case PopupPosition.CENTER_LEFT:
                    newLeft = 0;
                    newTop = ($(window).height() - Popup._realHeight(jPopup)) / 2;
                    break;
                case PopupPosition.CENTER_RIGHT:
                    newLeft = $(window).width() - Popup._realWidth(jPopup);
                    newTop = ($(window).height() - Popup._realHeight(jPopup)) / 2;
                    break;
                case PopupPosition.TOP_LEFT:
                    newLeft = 0;
                    newTop = 0;
                    break;
                case PopupPosition.TOP_RIGHT:
                    newLeft = $(window).width() - Popup._realWidth(jPopup);
                    newTop = 0;
                    break;
                case PopupPosition.BOTTOM_LEFT:
                    newLeft = 0;
                    newTop = $(window).height() - Popup._realHeight(jPopup);
                    break;
                case PopupPosition.BOTTOM_RIGHT:
                    newLeft = $(window).width() - Popup._realWidth(jPopup);
                    newTop = $(window).height() - Popup._realHeight(jPopup);
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
            newLeft = Math.min(newLeft, $(window).width() - Popup._realWidth(jPopup));
            newTop = Math.max(newTop, 0);
            newTop = Math.min(newTop, $(window).height() - jPopup.height());
            
            jPopup.css('left', newLeft)
                .css('top', newTop)
                .show();
                
            if (oOptions.allowDrag) {
                if (oOptions.draghandle) {
                    jPopup.draggable({
                        handle: oOptions.draghandle
                    });
                
                } else {
                    jPopup.draggable({
                        handle: sPopupDragHandleClass
                    });
                }
            }
        },
        
        hide: function(oPopup) {
            var jPopup = Popup._convertObject(oPopup);
            if (jPopup) {
                jPopup.hide();
            } else {
                throw "Cannot hide null popup";
            }
        },
        
        _reshowAll: function() {
            for (var i = 0; i < lsPopups.length; i++) {
                Popup.show(lsPopups[i]);
            }
        }
    };
    
    var timer;
    
    $(window).resize(function() {
        if (timer) {
             clearTimeout(timer);
         }
         // do a date calculation
         // show user changes to screen
         // call the function
         timer = setTimeout(Popup._reshowAll, 100);
    });
})();