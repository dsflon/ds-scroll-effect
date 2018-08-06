# ds-scroll-effect ( Don't Need jQuery )


スクロールを起点とした、要素のアニメーションを実装します。  
jQueryを必要ありません。  
ライブラリ側ではclassを付け外しするだけで、アニメーションはcssでtransition、transformを用いて操作します。

- Target browser : IE11+

___

# Install

```
npm i ds-scroll-effect -S
```

___

# Import

```
import DsScrollEffect from "ds-scroll-effect"
```

___

# Constructor

```
new DsScrollEffect(element [, option]);
```
|Argument|Data type|Default|Descroption|
|:-------|:--------|:------|:----------|
|element|String|-(Required)|対象要素を指定します。<br>ex) ".scroll-effect"|
option|Object|-|ex)<br>option = {<br>addClass: "active",<br>ajustVal: 100,<br>}|


|Option|Data type|Default|Descroption|
|:-------|:--------|:------|:----------|
|addClass|String|"start"|イベント発火時に付与されるclass名を指定します。<br>引数[element]で ".scroll-effect" を指定している場合、<br>デフォルトでは対象要素に class="scroll-effect_start" が付与されます。|
|ajustVal|Number|0|イベント発火位置を調整できます。<br>数値が大きいほど発火タイミングが遅くなります。|


___

# Demo

[https://dsflon.github.io/ds-scroll-effect/](https://dsflon.github.io/ds-scroll-effect/)

jScrollEffect を **".scroll-effect"** で実行している場合、  
イベント発火前にまず **".scroll-effect_transition**" が付与されます。  
css transition はこちらに設定してください。

".scroll-effect_transition" は **".scroll-effect_start**" 付与され、  
transition が終了すると削除されます。

```
import DsScrollEffect from "ds-scroll-effect"

new DsScrollEffect( ".scroll-effect", {
    ajustVal: 400
});
```
