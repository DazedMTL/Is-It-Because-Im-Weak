//=============================================================================
// LastDieEnemy.js
//=============================================================================

/*:ja
 * @plugindesc ver1.00 最後に亡くなったエネミーのID取得
 * @author まっつＵＰ
 *
 * @param index
 * @desc 変数にエネミーのindexを代入します。
 * 指定がない場合は代入しません。
 * @type variable
 * @default
 *
 * @param id
 * @desc 変数にエネミーのIDを代入します。
 * 指定がない場合は代入しません。
 * @type variable
 * @default
 *
 * @help
 *
 * RPGで笑顔を・・・
 *
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 *
 * 最後に戦闘不能になったエネミーの
 * IDまたはindexを取得することができます。
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
  var parameters = PluginManager.parameters("LastDieEnemy");
  var LDEindex = Number(parameters["index"] || 0);
  var LDEid = Number(parameters["id"] || 0);

  Game_Enemy.prototype.setIdorIndex = function () {
    if (LDEindex) $gameVariables.setValue(LDEindex, this.index());
    if (LDEid) $gameVariables.setValue(LDEid, this._enemyId);
  };

  Game_Enemy.prototype.die = function () {
    this.setIdorIndex();
    Game_BattlerBase.prototype.die.call(this);
  };
})();
