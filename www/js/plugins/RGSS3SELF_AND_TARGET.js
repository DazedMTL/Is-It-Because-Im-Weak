#==============================================================================
# �� RGSS3 �s���ҁE�Ώێ�ID�E�g�p�X�L��/�A�C�e��ID�ϐ��i�[ Ver1.03 by ����
#------------------------------------------------------------------------------
# �s�����O�ɁA�s���҂ƑΏێ҂�ID��ϐ��Ɋi�[���܂��B
# �A�N�^�[�̏ꍇ�̓A�N�^�[ID���i�[���܂��B�i1�`�H�j
# �G�̏ꍇ�́A�G�O���[�v����ID��-1�Ŋ|���������i�[���܂��B�i0�`-7�j
# �����̑����ΏۂƂ���X�L���̏ꍇ�A�Ō�̑Ώۂ��ϐ��Ɋi�[����܂��B
# �ϐ��̊i�[���A����̃A�C�e���E�X�L���ł̂ݍs���悤�ɂ���ݒ���\�ł��B
# 
# �f�ޓ����ʒu�́A�f�ޗ��̂Ȃ�ׂ����ɂ���悤�ɂ��ĉ������B
#==============================================================================
# ALL��false�̏ꍇ�̂݁A�X�L��/�A�C�e���̃������Ɏw��B(true�̏ꍇ�͑S�Ă��Ώ�)
#------------------------------------------------------------------------------
# <�ϐ��i�[>
# 
# ���̃X�L��/�A�C�e�����g�p���A�ϐ���ID���i�[����B
#==============================================================================
# �C�x���g�R�}���h�̃X�N���v�g(��������ł���)���g�p�B
#------------------------------------------------------------------------------
# last_target_include?(1)
# 
# �^�[�Q�b�g�ɃA�N�^�[ID1���܂܂�Ă������ǂ����𔻒�B
#------------------------------------------------------------------------------
# last_target_include?(2)
# 
# �^�[�Q�b�g�ɃA�N�^�[ID2���܂܂�Ă������ǂ����𔻒�B
#------------------------------------------------------------------------------
# last_target_include?(0)
# 
# �^�[�Q�b�g�ɓG�O���[�v�C���f�b�N�X0(�\����index 1)���܂܂�Ă������ǂ����𔻒�B
#------------------------------------------------------------------------------
# last_target_include?(-1)
# 
# �^�[�Q�b�g�ɓG�O���[�v�C���f�b�N�X1(�\����index 2)���܂܂�Ă������ǂ����𔻒�B
#==============================================================================
# Ver1.02 Ver1.01�������o�[�W�������݂��A���ꂼ��œ��삪�قȂ��������C���B
#         ������S�̓I�Ɋȗ����B
#         �C�x���g�R�}���h��p���Ē��O�̑S�Ẵ^�[�Q�b�g�𒲍��\�ɁB
#
# Ver1.03 ���炭Ver1.02����G�^�[�Q�b�g�擾�̍ۂ�
#         ���̐����擾���Ă����s����C���B
#==============================================================================
module SELF_AND_TARGET
  
  #�S�ẴA�C�e���E�X�L���ŕϐ��i�[���s�������w��B
  #�itrue�ōs��/false�ōs��Ȃ��j
  
  ALL  = true
  
  #�L�[���[�h���w��B
  
  WORD = "<�ϐ��i�[>"
  
  #�g�p�҂�ID���i�[����ϐ����w�肵�܂��B
  
  SV   = 51
  
  #�Ώێ҂�ID���i�[����ϐ����w�肵�܂��B
  
  TV   = 52
  
  #�g�p�����݂��X�L����ID���i�[����ϐ����w�肵�܂��B
  #�g�p�����̂��X�L���łȂ���΁A0���i�[����܂��B
  
  SI   = 53
  
  #�g�p�����݂��A�C�e����ID���i�[����ϐ����w�肵�܂��B
  #�g�p�����̂��A�C�e���łȂ���΁A0���i�[����܂��B
  
  II   = 54
  
  #--------------------------------------------------------------------------
  # �ȗ����p�̔z���p��
  #--------------------------------------------------------------------------
  def self.array
    [SV,TV,SI,II]
  end
end
class Game_Interpreter
  #--------------------------------------------------------------------------
  # �^�[�Q�b�g�Ɏw��ID���܂܂�Ă��邩�H
  #--------------------------------------------------------------------------
  def last_target_include?(id)
    $game_party.last_target_include?(id)
  end
end
class Game_Party
  attr_accessor :last_all_targets_data
  #--------------------------------------------------------------------------
  # �^�[�Q�b�g�Ɏw��ID���܂܂�Ă��邩�H
  #--------------------------------------------------------------------------
  def last_target_include?(id)
    return false unless @last_all_targets_data
    @last_all_targets_data.include?(id)
  end
end
class Game_Action
  attr_accessor :targets_data
  #--------------------------------------------------------------------------
  # �^�[�Q�b�g�̔z��쐬
  #--------------------------------------------------------------------------
  alias make_targets_premake make_targets
  def make_targets
    
    #�^�[�Q�b�g���ɍ쐬���܂��B
    
    @targets_data ||= make_targets_premake
    
  end
  #--------------------------------------------------------------------------
  # �N���A
  #--------------------------------------------------------------------------
  alias clear_premake clear
  def clear
    
    #�{���̏��������s���܂��B
    
    clear_premake
    
    #�^�[�Q�b�g�f�[�^��nil�ɂ��܂��B
    
    @targets_data = nil
    
  end
end
class Scene_Base
  #--------------------------------------------------------------------------
  # �ϐ��ւ̊i�[����
  #--------------------------------------------------------------------------
  def method_for_self_and_target(user,item_data,targets)
    
    #�ϐ����i�[����ꍇ�͕���B
    
    if item_data.variables_get_is?
      
      #�ϐ�ID�̔z����擾�B
      
      a = SELF_AND_TARGET.array
      
      #�g�p�҂̕ϐ���ID/�C���f�b�N�X���i�[�B
      
      $game_variables[a[0]] = user.actor? ? user.id : user.index * -1
      
      #�^�[�Q�b�g���쐬�B
      #�^�[�Q�b�g��1�̈ȏ㑶�݂���ꍇ�͍ŏI�^�[�Q�b�g���B
      #���݂��Ȃ��ꍇ�͎g�p�҃X�L���ɓǂݑւ��A�g�p�҂��ŏI�^�[�Q�b�g�Ƃ���
      #�Ώێ҂̕ϐ���ID/�C���f�b�N�X���i�[�B
      
      ta = targets.compact.inject([]) {|r,i| r.push(i.actor? ? i.id : i.index * -1)}
      
      if ta && ta.empty?
        ta = [user.actor? ? user.id : user.index]
      end
      
      $game_variables[a[1]] = ta[-1]
      
      $game_party.last_all_targets_data = ta
      
      #�X�L��ID/�A�C�e��ID���i�[�B
      #���ꂼ��A�X�L���łȂ��ꍇ�A�A�C�e���łȂ��ꍇ��0���i�[����B
      
      $game_variables[a[2]] = item_data.is_a?(RPG::Skill) ? item_data.id : 0
      $game_variables[a[3]] = item_data.is_a?(RPG::Item) ? item_data.id : 0
      
    end
  end
end
class Scene_Battle < Scene_Base
  #--------------------------------------------------------------------------
  # �X�L���^�A�C�e���̎g�p
  #--------------------------------------------------------------------------
  alias use_item_self_and_target use_item
  def use_item
    
    #�ϐ��ւ̊i�[���������s�B
    
    method_for_self_and_target(@subject,@subject.current_action.item,
    @subject.current_action.make_targets.compact)
    
    #�{���̏��������s�B
    
    use_item_self_and_target
  end
end
class Scene_Skill < Scene_ItemBase
  #--------------------------------------------------------------------------
  # �A�C�e���̎g�p
  #--------------------------------------------------------------------------
  alias use_item_self_and_target use_item
  def use_item
    
    #�ϐ��ւ̊i�[���������s�B
    
    method_for_self_and_target(user,item,item_target_actors)
    
    #�{���̏��������s�B
    
    use_item_self_and_target
  end
end
class Scene_Item < Scene_ItemBase
  #--------------------------------------------------------------------------
  # �A�C�e���̎g�p
  #--------------------------------------------------------------------------
  alias use_item_self_and_target use_item
  def use_item
    
    #�ϐ��ւ̊i�[���������s�B
    
    method_for_self_and_target(user,item,item_target_actors)
    
    #�{���̏��������s�B
    
    use_item_self_and_target
  end
end
class RPG::BaseItem
  #--------------------------------------------------------------------------
  # �ϐ����i�[����A�C�e��/�X�L�����H
  #--------------------------------------------------------------------------
  def variables_get_is?
    (@variables_get_is ||= ((@note.include?(SELF_AND_TARGET::WORD) or SELF_AND_TARGET::ALL) ? 1 : 0)) == 1
  end
end