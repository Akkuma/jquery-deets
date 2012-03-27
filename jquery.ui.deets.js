/*
* jQuery UI Deets v1.0.0
* Copyright (c) 2012, Gregory Waxman. All rights reserved.
*
* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
*	1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
*	2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
*	3. The names of its contributors may not be used to endorse or promote products derived from this software without specific prior written permission.
*	4. All private modifications should be offered to the author at https://github.com/Akkuma/jquery-deets
*	5. All public forks must notify the author of their existence. Using github to directly fork the project will be considered sufficient notification and will fulfill this obligation.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/(
function ($, undefined) {
    var isDetailsSupported = 'open' in document.createElement('details')
    , $1 = $1 || $
    ;

    function open() {
        var self = this
        , $element = this.element
        , element = $element[0]
        , speed = this.options.speed
        ;

        this._trigger('.opening');
        if (isDetailsSupported) {
            element.open = true;
        }
        else {
            $element.attr('open', 'true');
        }
        this.isOpen = true;

        $element.animate(
            { height: this._detailsHeight },
            { duration: speed,
                complete: function () {
                    self._trigger('.opened');
                }
            }
        );
    }

    function close() {
        var self = this
        , $element = this.element
        , element = $element[0]
        , speed = this.options.speed
        ;
        self._trigger('.closing');
        this.isOpen = false;

        $element.animate(
            { height: this._summaryHeight },
            { duration: speed,
                complete: function () {
                    if (isDetailsSupported) {
                        element.open = false;
                    }
                    else {
                        $element.removeAttr('open');
                    }

                    self._trigger('.closed');
                }
            }
        );
    }

    $.widget("ui.deets", {
        options: {
            speed: 0
        },

        _create: function () {
            if (this.widgetName !== 'deets') {
                $.data(this.element[0], 'deets', this);
            }

            this.isOpen = this.element[0].open || this.element.attr('open');

            if (!isDetailsSupported || this.options.speed) {
                this._polyfillDetails();
            }
        },

        _polyfillDetails: function () {
            var $element = this.element
            , element = $element[0]
            ;

            this._summaryHeight = $element.find('summary').outerHeight(true);

            this.storeHeights();

            if (!this.isOpen) {
                $element.css({ height: this._summaryHeight });
            }
        },

        storeHeights: function () {
            var $element = this.element
            , element = $element[0]
            ;

            if (!isDetailsSupported) {
                this._detailsHeight = $element.removeClass('closed').outerHeight(true);
            }
            else {
                element.open = true;
                this._detailsHeight = $element.outerHeight(true);
                element.open = this.isOpen;
            }

        },
        open: function () {
            open.call(this);
        },

        close: function () {
            close.call(this);
        },

        toggle: function () {
            (this.isOpen ? close : open).call(this);
        },

        summary: function () {
            return this.element.find('summary').text();
        },

        _destroy: function () {
            $.Widget.prototype.destroy.apply(this, arguments); // default destroy

            !isDetailsSupported && this.element.removeClass("virtual-details");
        }
    });

    $(function () {
        $(document.body).on('click', 'summary', function (e) {
            var data = $.data($1(this).parent()[0], 'deets')
            , speed = data.options.speed
            , func
            ;

            if (!isDetailsSupported || speed) {
                e.preventDefault();
                (!data.isOpen ? open : close).call(data);
            }
        });

        $('details').each(function () {
            var $this = $1(this);

            $this.deets($this.data('deet'));
        });
    });
})(jQuery);