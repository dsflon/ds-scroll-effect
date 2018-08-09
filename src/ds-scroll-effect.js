/*

ds-scroll-effect

GitHub: https://github.com/dsflon/
License: dsflon All Rights Reserved.

*/

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.DsScrollEffect = factory();
    }
}(this, function() {

    function DsScrollEffect(selector, option)  {

        this.selector = selector;
        this.selectorName = this.selector.split(".")[1] ? this.selector.split(".")[1] : this.selector.split("#")[1];

        //option
        if(option == null) option = {};
        this.addClass = option.addClass ? option.addClass : "start";
        this.ajustVal = option.ajustVal ? option.ajustVal : 0;

        this.target = document.getElementsByClassName( selector.split(".")[1] );

        this.class_transition = this.selectorName + "_transition";

        if( this.target.length != 0 ) {
            this.Init();
        } else {
            console.error("."+selector.split(".")[1]+" is not found");
        }

    }


    /**
    **
    ** Init
    **
    **/
    DsScrollEffect.prototype.Init = function() {

        var THAT = this;

        for (var i = 0; i < this.target.length; i++) {

            Func(i)

        }

        function Func(INDEX) {

            THAT.SetInitialClass(INDEX);
            THAT.StartEffect(INDEX);

            window.addEventListener('scroll', function() {
                THAT.StartEffect(INDEX);
            })
            window.addEventListener('resize', function() {
                THAT.StartEffect(INDEX);
            })

        }

    }


    /**
    **
    ** StartEffect
    **
    **/
    DsScrollEffect.prototype.SetInitialClass = function(i) {

        var THAT = this;
        var data = this.target[i].getAttribute( "data-effecttarget" );


        if( data ) {

            this.dataTarget = document.querySelectorAll(data);

            for (var j = 0; j < this.dataTarget.length; j++) {

                this.AddClass( this.dataTarget[j], this.class_transition );
                EndFunc(j);

            }

            function EndFunc(j) {
                THAT.dataTarget[j].addEventListener('transitionend', function() {
                    THAT.RemoveClass( THAT.dataTarget[j], THAT.class_transition );
                })
            }

        } else {

            this.AddClass( this.target[i], this.class_transition );

            this.target[i].addEventListener('transitionend', function() {
                THAT.RemoveClass( THAT.target[i], THAT.class_transition );
            })

        }

    }


    /**
    **
    ** StartEffect
    **
    **/
    DsScrollEffect.prototype.StartEffect = function(i) {

        var flag = false;

        var SCROLL_TOP = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var WIN_HEIGHT = window.document.documentElement.clientHeight;
        var DOC_HEIGHT = document.documentElement.scrollHeight;

        var VIEW = SCROLL_TOP + WIN_HEIGHT;
        var OFFSET = this.GetOffset(this.target[i]).top + this.ajustVal;

        if( VIEW > OFFSET ) {

            if( !flag ) {
                this.AddClass( this.target[i], this.selectorName + "_" + this.addClass );
                flag = true;
            }

        } else {

            if( flag ) {
                flag = false;
            }

        }

        //scrollEnd
        if( SCROLL_TOP + WIN_HEIGHT >= DOC_HEIGHT - 200  ) {

            for (var j = 0; j < this.target.length; j++) {
                this.AddClass( this.target[j], this.selectorName + "_" + this.addClass );
            }

        }

    }


    /**
    **
    ** GetOffset
    **
    **/
    DsScrollEffect.prototype.GetOffset = function(el) {

        var BOX = el.getBoundingClientRect();

        return {
            top: BOX.top + window.pageYOffset - document.documentElement.clientTop,
            left: BOX.left + window.pageXOffset - document.documentElement.clientLeft
        }

    }
    DsScrollEffect.prototype.AddClass = function( element, _className ) {

        if (element.classList) {
            element.classList.add(_className);
        } else {
            element.className += ' ' + _className;
        }

    }
    DsScrollEffect.prototype.RemoveClass = function( element, _className ) {

        if (element.classList) {
            element.classList.remove(_className);
        } else {
            element.className = element.className.replace(new RegExp('(^|\\b)' + _className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }

    }

    return DsScrollEffect;

}));
