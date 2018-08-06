/*

ds-scroll-effect

GitHub: https://github.com/dsflon/
License: dsflon All Rights Reserved.

*/

export default class DsScrollEffect {
    
    constructor(selector, option) {

        this.selector = selector;
        this.selectorName = this.selector.split(".")[1] ? this.selector.split(".")[1] : this.selector.split("#")[1];

        //option
        if(option == null) option = {};
        this.addClass = option.addClass ? option.addClass : "start";
        this.ajustVal = option.ajustVal ? option.ajustVal : 0;

        this.target = document.getElementsByClassName( selector.split(".")[1] );

        this.class_transition = this.selectorName + "_transition";

        if( this.target ) {
            this.Init();
        }

    }


    /**
    **
    ** Init
    **
    **/
    Init() {

        const Func = (INDEX) => {

            this.SetInitialClass(INDEX);
            this.StartEffect(INDEX);

            window.addEventListener('scroll', () => {
                this.StartEffect(INDEX);
            })
            window.addEventListener('resize', () => {
                this.StartEffect(INDEX);
            })

        }

        for (var i = 0; i < this.target.length; i++) {

            Func(i)

        }

    }


    /**
    **
    ** StartEffect
    **
    **/
    SetInitialClass(i) {

        const DATA = this.target[i].getAttribute( "data-effecttarget" );

        if( DATA ) {

            this.dataTarget = document.querySelectorAll(DATA);

            const EndFunc = (j) => {
                this.dataTarget[j].addEventListener('transitionend', () => {
                    this.RemoveClass( this.dataTarget[j], this.class_transition );
                })
            }

            for (var j = 0; j < this.dataTarget.length; j++) {

                this.AddClass( this.dataTarget[j], this.class_transition );
                EndFunc(j);

            }

        } else {

            this.AddClass( this.target[i], this.class_transition );

            this.target[i].addEventListener('transitionend', () => {
                this.RemoveClass( this.target[i], this.class_transition );
            })

        }

    }


    /**
    **
    ** StartEffect
    **
    **/
    StartEffect(i) {

        let flag = false;

        const SCROLL_TOP = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const WIN_HEIGHT = window.document.documentElement.clientHeight;
        const DOC_HEIGHT = document.documentElement.scrollHeight;

        const VIEW = SCROLL_TOP + WIN_HEIGHT;
        const OFFSET = this.GetOffset(this.target[i]).top + this.ajustVal;

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
    GetOffset(el) {

        const BOX = el.getBoundingClientRect();

        return {
            top: BOX.top + window.pageYOffset - document.documentElement.clientTop,
            left: BOX.left + window.pageXOffset - document.documentElement.clientLeft
        }

    }
    AddClass( element, _className ) {

        if (element.classList) {
            element.classList.add(_className);
        } else {
            element.className += ' ' + _className;
        }

    }
    RemoveClass( element, _className ) {

        if (element.classList) {
            element.classList.remove(_className);
        } else {
            element.className = element.className.replace(new RegExp('(^|\\b)' + _className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }

    }

}
