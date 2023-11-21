//=============================================================================
// TargetWithoutUser.js
//=============================================================================
//
//Copyright (c) 2015 Alec
//This software is released under the MIT License.
//http://opensource.org/licenses/mit-license.php
//ここから上の行を変更しなければこのプラグインは自由に使用することができます。
/*:
 * @plugindesc スキルやアイテムの対象から使用者を除外するためのプラグイン
スキルやアイテムのnoteに「<target_without_user>」と書き込んで下さい
 * @author Alec
 *
 *:ja
 * @plugindesc スキルやアイテムの対象から使用者を除外するためのプラグイン
スキルやアイテムのnoteに「<target_without_user>」と書き込んで下さい
 * @author Alec
 * 
 */

(function () {
  var prev_method = Game_Action.prototype.testApply;
  Game_Action.prototype.testApply = function (target) {
    if (!this.item().meta.target_without_user) {
      return prev_method.call(this, target);
    }
  };

  var prev_Scene_Battle_selectActorSelection =
    Scene_Battle.prototype.selectActorSelection;
  Scene_Battle.prototype.selectActorSelection = function () {
    var action = BattleManager.inputtingAction();
    this._actorWindow.setAction(action);

    prev_Scene_Battle_selectActorSelection.call(this);
  };

  Window_BattleActor.prototype.setAction = function (action) {
    this._action = action;
  };

  Window_BattleActor.prototype.drawItem = function (index) {
    var actor = $gameParty.battleMembers()[index];

    this.changePaintOpacity(this.isEnabled(actor));
    this.drawBasicArea(this.basicAreaRect(index), actor);
    this.drawGaugeArea(this.gaugeAreaRect(index), actor);
    this.changePaintOpacity(1);
  };

  Window_BattleActor.prototype.isEnabled = function (actor) {
    if (!this._action) {
      return true;
    }
    var target_without_user = false;
    target_without_user = this._action.item().meta.target_without_user;
    if (target_without_user) {
      var isSameUser = this._action.subject()._actorId == actor._actorId;
      if (isSameUser) {
        return false;
      }
    }
    return true;
  };

  Window_BattleActor.prototype.isCurrentItemEnabled = function () {
    var actor = $gameParty.battleMembers()[this.index()];
    return this.isEnabled(actor);
  };

  Scene_ItemBase.prototype.determineItem = function () {
    var action = new Game_Action(this.user());
    var item = this.item();
    action.setItemObject(item);
    if (action.isForFriend()) {
      this._actorWindow.setAction(action);
      this.showSubWindow(this._actorWindow);
      this._actorWindow.selectForItem(this.item());
    } else {
      this.useItem();
      this.activateItemWindow();
    }
  };

  Window_MenuActor.prototype.setAction = function (action) {
    this._action = action;
  };

  Window_MenuActor.prototype.drawItemStatus = function (index) {
    this.changePaintOpacity(this.isEnabled(index));
    Window_MenuStatus.prototype.drawItemStatus.call(this, index);
    this.changePaintOpacity(1);
  };

  Window_MenuActor.prototype.isEnabled = function (index) {
    if (!this._action) {
      return true;
    }
    var actor = $gameParty.members()[index];
    var target_without_user = false;
    target_without_user = this._action.item().meta.target_without_user;
    if (target_without_user) {
      var isSameUser = this._action.subject()._actorId == actor._actorId;
      if (isSameUser) {
        return false;
      }
    }
    return true;
  };

  Window_MenuActor.prototype.isCurrentItemEnabled = function () {
    if (!this.isEnabled(this.index())) {
      return false;
    }
    return Window_MenuStatus.prototype.isCurrentItemEnabled.call(this);
  };
})();
