// PopupJs
//  - Requires jQuery

(function() {
    // Associative Array of Popup => Option
    var lsPopups = [];
    var sPopupDragHandleClass = 'popup-drag-handle';
    var sTitleClass = 'popup-title';
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

        // Returns true if correct input, false otherwise
        manage: function(oPopup, oOptions) {
            var jPopup = Popup._convertObject(oPopup);
            if (jPopup) {
                if (jPopup.data('popupId') === undefined) {
                    jPopup.data('popupId', popupId++);
                    lsPopups[jPopup.data('popupId')] = jPopup;
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

            var jAxis = Popup._convertObject(oOptions.oElAxis);
            if ((jAxis.length <= 0) && (oOptions.nPosition < PopupPosition.CENTER_SCREEN)) {
                throw "Cannot position relative to null element";
            }

            // Discard whatever position was here before. These are popups.
            jPopup.css('position', 'absolute')
                .css('z-index', nDefaultZIndex)
                .css('width', jPopup.width());

            var newLeft = null;
            var newTop = null;

            switch(oOptions.nPosition)
            {
                case PopupPosition.BELOW_LEFT_ALIGN:
                    newLeft = jAxis.offset().left;
                    newTop = jAxis.offset().top + jAxis.outerHeight();
                    break;
                case PopupPosition.BELOW_RIGHT_ALIGN:
                    newLeft = jAxis.offset().left - jPopup.outerWidth() + jAxis.outerWidth();
                    newTop = jAxis.offset().top + jAxis.outerHeight();
                    break;
                case PopupPosition.TOP_LEFT_ALIGN:
                    newLeft = jAxis.offset().left;
                    newTop = jAxis.offset().top - jPopup.outerHeight();
                    break;
                case PopupPosition.TOP_RIGHT_ALIGN:
                    newLeft = jAxis.offset().left - jPopup.outerWidth() + jAxis.outerWidth();
                    newTop = jAxis.offset().top - jPopup.outerHeight();
                    break;
                case PopupPosition.LEFT_BOTTOM_ALIGN:
                    newLeft = jAxis.offset().left - jPopup.outerWidth();
                    newTop = jAxis.offset().top - jPopup.outerHeight() + jAxis.outerHeight();
                    break;
                case PopupPosition.LEFT_TOP_ALIGN:
                    newLeft = jAxis.offset().left - jPopup.outerWidth();
                    newTop = jAxis.offset().top;
                    break;
                case PopupPosition.RIGHT_BOTTOM_ALIGN:
                    newLeft = jAxis.offset().left + jAxis.outerWidth();
                    newTop = jAxis.offset().top - jPopup.outerHeight() + jAxis.outerHeight();
                    break;
                case PopupPosition.RIGHT_TOP_ALIGN:
                    newLeft = jAxis.offset().left + jAxis.outerWidth();
                    newTop = jAxis.offset().top;
                    break;
                case PopupPosition.CENTER_SCREEN:
                    newLeft = ($(window).width() - jPopup.outerWidth()) / 2;
                    newTop = ($(window).height() - jPopup.outerHeight()) / 2;
                    break;
                case PopupPosition.CENTER_TOP:
                    newLeft = ($(window).width() - jPopup.outerWidth()) / 2;
                    newTop = 0;
                    break;
                case PopupPosition.CENTER_BOTTOM:
                    newLeft = ($(window).width() - jPopup.outerWidth()) / 2;
                    newTop = $(window).height() - jPopup.outerHeight();
                    break;
                case PopupPosition.CENTER_LEFT:
                    newLeft = 0;
                    newTop = ($(window).height() - jPopup.outerHeight()) / 2;
                    break;
                case PopupPosition.CENTER_RIGHT:
                    newLeft = $(window).width() - jPopup.outerWidth();
                    newTop = ($(window).height() - jPopup.outerHeight()) / 2;
                    break;
                case PopupPosition.TOP_LEFT:
                    newLeft = 0;
                    newTop = 0;
                    break;
                case PopupPosition.TOP_RIGHT:
                    newLeft = $(window).width() - jPopup.outerWidth();
                    newTop = 0;
                    break;
                case PopupPosition.BOTTOM_LEFT:
                    newLeft = 0;
                    newTop = $(window).height() - jPopup.outerHeight();
                    break;
                case PopupPosition.BOTTOM_RIGHT:
                    newLeft = $(window).width() - jPopup.outerWidth();
                    newTop = $(window).height() - jPopup.outerHeight();
                    break;
            }

            // Optionally add the offsets
            if (oOptions.xOffset) {
                newLeft += oOptions.xOffset;
            }
            if (oOptions.yOffset) {
                newTop += oOptions.yOffset;
            }
            
            // Optionally subtract the offsets of the parent
            if (oOptions.oElParent) {
                var jParent = Popup._convertObject(oOptions.oElParent);
                if (jParent.length) {
                    newLeft -= jParent.offset().left;
                    newTop -= jParent.offset().top;
                } else {
                   throw "Parent specified but not found";
               }
            } else if (oOptions.findParent) {
                var elSuperParent = $('html')[0];
                var jParent = jPopup;
                do {
                    jParent = jParent.parent();
                    if (jParent.css('position') !== 'static') {
                        newLeft -= jParent.offset().left;
                        newTop -= jParent.offset().top;
                        break;
                    }
                } while (jParent[0] !== elSuperParent);
            }

            // Always show on screen
            newLeft = Math.max(newLeft, 0);
            newLeft = Math.min(newLeft, $(window).width() - jPopup.outerWidth());
            newTop = Math.max(newTop, 0);
            newTop = Math.min(newTop, $(window).height() - jPopup.height());

            // Finally show the popup
            jPopup.css('left', newLeft)
                .css('top', newTop)
                .show()
                // Clicks that show the popup will propogate to the document click event handler
                // Stall one click before hiding the popup
                .data('justShown', true);

            // Allow popup to become draggable
            if (oOptions.allowDrag) {
                if (oOptions.draghandle) {
                    jPopup.draggable({
                        handle: oOptions.draghandle
                    });
                } else {
                    jPopup.draggable({
                        handle: '.'+sPopupDragHandleClass
                    });
                }
            } else {
                jPopup.draggable('destroy')
            }
            
            // fHideOthersOnShow
            if (oOptions.fHideOthersOnShow) {
                for (var i = 0; i < lsPopups.length; i++) {
                    Popup.hide(lsPopups[i]);
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
        },
        
        _containedWithin: function(jPopup, event) {
            if (jPopup.data('justShown')) {
                jPopup.data('justShown', false);
                return true;
            }
            return ($(event.target).parents().index(jPopup) != -1);
        }
    };

    // Primite debounce
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
    
    // Handle clicking outside of window
    // Do not use stop propogation as that may interfere with other actions
    $(document).click(function(event) {
        for (var i = 0; i < lsPopups.length; i++) {
            if (!Popup._containedWithin(lsPopups[i], event)) {
                Popup.hide(lsPopups[i]);
            }
        }
    });
})();
