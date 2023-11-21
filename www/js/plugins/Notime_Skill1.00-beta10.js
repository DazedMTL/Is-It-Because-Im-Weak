#==============================================================================
# �����������X�L�� for RGSS3 Ver1.00-��10
# ���쐬�� kure
#==============================================================================

module KURE
  module NotimeSkill
  #�R�����C�x���g�̏������@(0=�c�N�[���̎d�l�ʂ�@1=������ɔ���)
  COMMON_EVENT = 1
  
  end
end

#==============================================================================
# �� RPG::UsableItem (�Ē�`)
#==============================================================================
class RPG::UsableItem < RPG::BaseItem
  #--------------------------------------------------------------------------
  # �� ���������X�L���̒�`(�ǉ���`)
  #--------------------------------------------------------------------------  
  def no_time_effect
    return true if @note.include?("<��������>")
    return false
  end
end

#==============================================================================
# �� Game_Action
#==============================================================================
class Game_Action
  #--------------------------------------------------------------------------
  # �� �A�C�e���I�u�W�F�N�g��`(�ǉ���`)
  #--------------------------------------------------------------------------
  def item=(item)
    @item.object = item if item
  end
  #--------------------------------------------------------------------------
  # �� �s����̂̒�`(�ǉ���`)
  #--------------------------------------------------------------------------
  def subject=(subject)
    @subject = subject if subject
  end
end

#==============================================================================
# �� Game_Actor
#==============================================================================
class Game_Actor < Game_Battler
  #--------------------------------------------------------------------------
  # �� �퓬�s����ǉ�(�ǉ���`)
  #--------------------------------------------------------------------------
  def add_current_action(action)
    @actions.unshift(action)
  end
  #--------------------------------------------------------------------------
  # �� �R�}���h�ʒu����߂�(�ǉ���`)
  #--------------------------------------------------------------------------
  def reinput_command
    @actions.shift
    @action_input_index -= 1
  end
end

#==============================================================================
# �� Scene_Battle
#==============================================================================
class Scene_Battle < Scene_Base
  #--------------------------------------------------------------------------
  # �� �A�C�e���m����n(�G�C���A�X�Ē�`)
  #--------------------------------------------------------------------------
  alias k_before_turncut_on_item_ok on_item_ok
  def on_item_ok
    @notime_item = false
    @item = @item_window.item
    if @item.no_time_effect
      @subject = BattleManager.actor
      @notime_item = true
      if !@item.need_selection?
        notime_skill_process(@subject, @item)
      elsif @item.for_opponent?
        select_enemy_selection
      else
        select_actor_selection
      end
    else
      k_before_turncut_on_item_ok
    end
  end
  #--------------------------------------------------------------------------
  # �� �A�C�e���m�L�����Z���n(�G�C���A�X�Ē�`)
  #--------------------------------------------------------------------------
  alias k_before_turncut_on_item_cancel on_item_cancel
  def on_item_cancel
    @notime_item = false
    k_before_turncut_on_item_cancel
  end
  #--------------------------------------------------------------------------
  # �� �X�L���m����n(�G�C���A�X�Ē�`)
  #--------------------------------------------------------------------------
  alias k_before_turncut_on_skill_ok on_skill_ok
  def on_skill_ok
    @notime_skill = false
    @skill = @skill_window.item
    if @skill.no_time_effect
      @subject = BattleManager.actor
      @notime_skill = true
      if !@skill.need_selection?
        notime_skill_process(@subject, @skill)
      elsif @skill.for_opponent?
        select_enemy_selection
      else
        select_actor_selection
      end
    else
      k_before_turncut_on_skill_ok
    end
  end
  #--------------------------------------------------------------------------
  # �� �X�L���m�L�����Z���n(�G�C���A�X�Ē�`)
  #--------------------------------------------------------------------------
  alias k_before_turncut_on_skill_cancel on_skill_cancel
  def on_skill_cancel
    @notime_skill = false
    k_before_turncut_on_skill_cancel
  end
  #--------------------------------------------------------------------------
  # �� �A�N�^�[�m����n(�G�C���A�X�Ē�`)
  #--------------------------------------------------------------------------
  alias k_before_turncut_on_actor_ok on_actor_ok
  def on_actor_ok
    if @notime_skill
      notime_skill_process(@subject, @skill, @actor_window.index)
    elsif @notime_item
      notime_skill_process(@subject, @item, @actor_window.index)
    else
      k_before_turncut_on_actor_ok
    end
  end
  #--------------------------------------------------------------------------
  # �� �G�L�����m����n(�G�C���A�X�Ē�`)
  #--------------------------------------------------------------------------
  alias k_before_turncut_on_enemy_ok on_enemy_ok
  def on_enemy_ok
    if @notime_skill
      notime_skill_process(@subject, @skill, @enemy_window.enemy.index)
    elsif @notime_item
      notime_skill_process(@subject, @item, @enemy_window.enemy.index)
    else
      k_before_turncut_on_enemy_ok
    end
  end
  #--------------------------------------------------------------------------
  # �� ���������v���Z�X(�ǉ���`)
  #--------------------------------------------------------------------------
  def notime_skill_process(actor, skill, target = nil)
    #�s���s�A�N�^�[�̔z����擾
    no_action_unit = all_battle_members.select{|battler| !battler.movable?}
    
    @actor_window.hide ; @enemy_window.hide
    @skill_window.hide ; @item_window.hide
    @notime_skill = false ; @notime_item = false
      
    @subject = actor
      
    no_time_skill = Game_Action.new(@subject)
    no_time_skill.item = skill
    no_time_skill.target_index = target if target
      
    @subject.add_current_action(no_time_skill)
    execute_action if @subject.current_action.valid?
    process_event if KURE::NotimeSkill::COMMON_EVENT == 1
    @subject.reinput_command
      
    @subject = nil
    #�s���s�A�N�^�[�̔z����r
    no_action_unit.each{|battler|
      battler.make_actions if battler.movable?}
      
    if BattleManager.in_phase?
      @status_window.open
      next_command
    end
  end
end

#==============================================================================
# �� BattleManager
#==============================================================================
class << BattleManager
  #--------------------------------------------------------------------------
  # ���퓬�t�F�C�Y�̑��ݔ���(�ǉ���`)
  #--------------------------------------------------------------------------
  def in_phase?
    return true if @phase
    return false
  end
end