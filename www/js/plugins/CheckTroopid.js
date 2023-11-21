//============================================================================
// CheckTroopid.js
//============================================================================

/*:ja
 * @plugindesc ver1.00 戦闘開始時に敵グループIDを取得します。
 * @author まっつＵＰ
 *
 * @param troopid
 * @desc 敵グループIDを代入する変数
 * @type variable
 * @default 10
 *
 * @help
 *
 * RPGで笑顔を・・・
 *
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 *
 * 各戦闘開始時に
 * 任意の変数に敵グループIDを代入します。
 *
 * 利用規約(2019/10/11変更)：
 * この作品は マテリアル・コモンズ・ブルー・ライセンスの下に提供されています。
 * https://materialcommons.tk/mtcm-b-summary/
 * クレジット表示：まっつＵＰ
 *
 */

(function () {
  var parameters = PluginManager.parameters("CheckTroopid");
  var CTtroopid = Number(parameters["troopid"] || 0);

  //マップのリフレッシュをしない方法で代入している。
  var _BattleManager_setup = BattleManager.setup;
  BattleManager.setup = function (troopId, canEscape, canLose) {
    if (CTtroopid > 0) $gameVariables._data[CTtroopid] = troopId;
    _BattleManager_setup.call(this, troopId, canEscape, canLose);
  };
})();
