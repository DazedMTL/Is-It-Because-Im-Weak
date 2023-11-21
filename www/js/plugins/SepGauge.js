//=============================================================================
// SepGauge.js
//=============================================================================

/*:ja
 * @plugindesc ver1.00 ゲージなんか必要ねえんだよ！
 * @author まっつＵＰ
 *
 * @help
 *
 * RPGで笑顔を・・・
 *
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 *
 * ※メニューでのTP表示を可能にするためには
 * 別途該当機能のつくプラグインを入れてください。
 *
 * アクター・職業のノートタグ
 * <NogaugeHP>
 * <NogaugeMP>
 * <NogaugeTP>
 * それぞれ非表示にしたいゲージのノートタグを記入してください。
 *
 * このプラグインを利用する場合は
 * readmeなどに「まっつＵＰ」の名を入れてください。
 * また、素材のみの販売はダメです。
 * 上記以外の規約等はございません。
 * もちろんツクールMVで使用する前提です。
 * 何か不具合ありましたら気軽にどうぞ。
 *
 * 免責事項：
 * このプラグインを利用したことによるいかなる損害も制作者は一切の責任を負いません。
 *
 */

(function () {
  //var parameters = PluginManager.parameters('SepGauge');

  Game_Actor.prototype.SGisGauge = function (text) {
    text = "<Nogauge" + text + ">";
    var r = new RegExp(text);
    return (
      $dataActors[this.actorId()].note.match(r) ||
      $dataClasses[this._classId].note.match(r)
    );
  };

  var _Window_Base_drawActorHp = Window_Base.prototype.drawActorHp;
  Window_Base.prototype.drawActorHp = function (actor, x, y, width) {
    if (actor.SGisGauge("HP")) return;
    _Window_Base_drawActorHp.call(this, actor, x, y, width);
  };

  var _Window_Base_drawActorMp = Window_Base.prototype.drawActorMp;
  Window_Base.prototype.drawActorMp = function (actor, x, y, width) {
    if (actor.SGisGauge("MP")) return;
    _Window_Base_drawActorMp.call(this, actor, x, y, width);
  };

  var _Window_Base_drawActorTp = Window_Base.prototype.drawActorTp;
  Window_Base.prototype.drawActorTp = function (actor, x, y, width) {
    if (actor.SGisGauge("TP")) return;
    _Window_Base_drawActorTp.call(this, actor, x, y, width);
  };
})();
