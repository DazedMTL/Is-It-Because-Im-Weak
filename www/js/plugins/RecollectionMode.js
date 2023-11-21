//=============================================================================
// RecollectionMode.js
// Copyright (c) 2015 rinne_grid
// This plugin is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//
// Version
// 1.0.0 2015/12/26 公開
// 1.1.0 2016/04/19 回想一覧にサムネイルを指定できるように対応
// 1.1.1 2016/05/03 セーブデータ20番目のスイッチが反映されない不具合を修正
//                  セーブデータ間のスイッチ共有オプション
//                  (share_recollection_switches)を追加
// 1.1.2 2016/05/09 回想用のCGリストのキーを数字から文字列に変更
// 1.1.3 2016/11/23 セーブデータが増えた場合にロード時間が長くなる問題を解消
// 1.1.4 2016/12/23 CG閲覧時にクリック・タップで画像送りができるよう対応
// 1.1.5 2017/01/26 CG・シーンで一部サムネイルが表示されない問題を解消
//=============================================================================

/*:ja
 * @plugindesc 回想モード機能を追加します。
 * @author rinne_grid
 *
 *
 * @help このプラグインには、プラグインコマンドはありません。
 *
 */

//-----------------------------------------------------------------------------
// ◆ プラグイン設定
//-----------------------------------------------------------------------------
var rngd_recollection_mode_settings = {
  //---------------------------------------------------------------------
  // ★ 回想モードで再生するBGMの設定をします
  //---------------------------------------------------------------------
  rec_mode_bgm: {
    bgm: {
      name: "FPC_BGM_Piano03",
      pan: 0,
      pitch: 100,
      volume: 60,
    },
  },
  //---------------------------------------------------------------------
  // ★ 回想CG選択ウィンドウの設定を指定します
  //---------------------------------------------------------------------
  rec_mode_window: {
    x: 20,
    y: 20,
    recollection_title: "回想モード",
    str_select_recollection: "回想を見る",
    str_select_cg: "CGを見る",
    str_select_back_title: "タイトルに戻る",
  },
  //---------------------------------------------------------------------
  // ★ 回想リストウィンドウの設定を指定します
  //---------------------------------------------------------------------
  rec_list_window: {
    // 1画面に表示する縦の数
    item_height: 3,
    // 1画面に表示する横の数
    item_width: 4,
    // 1枚のCGに説明テキストを表示するかどうか
    show_title_text: true,
    // タイトルテキストの表示位置(left:左寄せ、center:中央、right:右寄せ）
    title_text_align: "center",
    // 閲覧したことのないCGの場合に表示するピクチャファイル名
    never_watch_picture_name: "never_watch_picture",
    // 閲覧したことのないCGのタイトルテキスト
    never_watch_title_text: "？？？",
  },
  //---------------------------------------------------------------------
  // ★ 回想用のCGを指定します
  //---------------------------------------------------------------------
  rec_cg_set: {
    1: {
      title: "リッカ×ゴブリンSEX",
      pictures: [
        "rikkaGSex1",
        "rikkaGSexV1",
        "rikkaGSexV2",
        "rikkaGNakaV1",
        "rikkaGNakaV2",
        "rikkaGNakaV3",
        "rikkaGNakaV4",
        "rikkaGNakaV5",
        "rikkaGNakaV6",
        "rikkaGNakaV7",
      ],
      common_event_id: 801,
      switch_id: 1001,
      thumbnail: "tn1",
    },
    2: {
      title: "リッカ×ゴブリンSEX淫",
      pictures: [
        "rikkaGSex1",
        "rikkaGSexV1",
        "rikkaGSexV2",
        "rikkaGNakaV1",
        "rikkaGNakaV2",
        "rikkaGNakaV3",
        "rikkaGNakaV4",
        "rikkaGNakaV5",
        "rikkaGNakaV6",
        "rikkaGNakaV7",
      ],
      common_event_id: 802,
      switch_id: 1002,
      thumbnail: "tn2",
    },
    3: {
      title: "リッカ×ゴブリンSEX恋",
      pictures: [
        "rikkaGSex1",
        "rikkaGSexV1",
        "rikkaGSexV2",
        "rikkaGNakaV1",
        "rikkaGNakaV2",
        "rikkaGNakaV3",
        "rikkaGNakaV4",
        "rikkaGNakaV5",
        "rikkaGNakaV6",
        "rikkaGNakaV7",
      ],
      common_event_id: 803,
      switch_id: 1003,
      thumbnail: "tn3",
    },
    4: {
      title: "リッカ×ゴブリンAF",
      pictures: [
        "rikkaGSex1",
        "rikkaGSexA1",
        "rikkaGSexA1_1",
        "rikkaGSexA2",
        "rikkaGSexA3",
        "rikkaGSexA4",
        "rikkaGSexA5",
        "rikkaGSexA6",
        "rikkaGSexA7",
      ],
      common_event_id: 804,
      switch_id: 1004,
      thumbnail: "tn4",
    },
    5: {
      title: "リッカ×ゴブリンAF淫",
      pictures: [
        "rikkaGSex1",
        "rikkaGSexA1",
        "rikkaGSexA1_1",
        "rikkaGSexA2",
        "rikkaGSexA3",
        "rikkaGSexA4",
        "rikkaGSexA5",
        "rikkaGSexA6",
        "rikkaGSexA7",
      ],
      common_event_id: 805,
      switch_id: 1005,
      thumbnail: "tn5",
    },
    6: {
      title: "リッカ×ゴブリンAF恋",
      pictures: [
        "rikkaGSex1",
        "rikkaGSexA1",
        "rikkaGSexA1_1",
        "rikkaGSexA2",
        "rikkaGSexA3",
        "rikkaGSexA4",
        "rikkaGSexA5",
        "rikkaGSexA6",
        "rikkaGSexA7",
      ],
      common_event_id: 806,
      switch_id: 1006,
      thumbnail: "tn6",
    },
    7: {
      title: "シーナ×ゴブリンSEX",
      pictures: [
        "sinaGsexP1",
        "sinaGsexP2",
        "sinaGsexP3",
        "sinaGsex1",
        "sinaGsex2",
        "sinaGsex2Z",
        "sinaGsex3",
        "sinaGsex3Z",
        "sinaGsex4",
        "sinaGsex4Z",
      ],
      common_event_id: 807,
      switch_id: 1007,
      thumbnail: "tn7",
    },
    8: {
      title: "シーナ×ゴブリンSEX淫",
      pictures: [
        "sinaGsexP1",
        "sinaGsexP2",
        "sinaGsexP3",
        "sinaGsex1",
        "sinaGsex2",
        "sinaGsex2Z",
        "sinaGsex3",
        "sinaGsex3Z",
        "sinaGsex4",
        "sinaGsex4Z",
      ],
      common_event_id: 808,
      switch_id: 1008,
      thumbnail: "tn8",
    },
    9: {
      title: "シーナ×ゴブリンSEX恋",
      pictures: [
        "sinaGsexP1",
        "sinaGsexP2",
        "sinaGsexP3",
        "sinaGsex1",
        "sinaGsex2",
        "sinaGsex2Z",
        "sinaGsex3",
        "sinaGsex3Z",
        "sinaGsex4",
        "sinaGsex4Z",
      ],
      common_event_id: 809,
      switch_id: 1009,
      thumbnail: "tn9",
    },
    10: {
      title: "シーナ×ゴブリンAF",
      pictures: [
        "sinaGsexP1",
        "sinaGsexP2",
        "sinaGsexP3",
        "sinaGsex1",
        "sinaGsex2",
        "sinaGsex2Z",
        "sinaGsex3",
        "sinaGsex3Z",
        "sinaGsex4",
        "sinaGsex4Z",
      ],
      common_event_id: 810,
      switch_id: 1010,
      thumbnail: "tn10",
    },
    11: {
      title: "シーナ×ゴブリンAF淫",
      pictures: [
        "sinaGsexP1",
        "sinaGsexP2",
        "sinaGsexP3",
        "sinaGsex1",
        "sinaGsex2",
        "sinaGsex2Z",
        "sinaGsex3",
        "sinaGsex3Z",
        "sinaGsex4",
        "sinaGsex4Z",
      ],
      common_event_id: 811,
      switch_id: 1011,
      thumbnail: "tn11",
    },
    12: {
      title: "シーナ×ゴブリンAF恋",
      pictures: [
        "sinaGsexP1",
        "sinaGsexP2",
        "sinaGsexP3",
        "sinaGsex1",
        "sinaGsex2",
        "sinaGsex2Z",
        "sinaGsex3",
        "sinaGsex3Z",
        "sinaGsex4",
        "sinaGsex4Z",
      ],
      common_event_id: 812,
      switch_id: 1012,
      thumbnail: "tn12",
    },
    13: {
      title: "ヘレナ×ゴブリンSEX",
      pictures: [
        "herenaG1",
        "herenaG2",
        "herenaG3",
        "herenaG4",
        "herenaG5",
        "herenaG6",
        "herenaG7",
        "herenaG8",
        "herenaG12",
        "herenaG22",
        "herenaG23",
        "herenaG20",
        "herenaG21",
      ],
      common_event_id: 813,
      switch_id: 1013,
      thumbnail: "tn13",
    },
    14: {
      title: "ヘレナ×ゴブリンSEX淫",
      pictures: [
        "herenaG1",
        "herenaG2",
        "herenaG3",
        "herenaG4",
        "herenaG5",
        "herenaG6",
        "herenaG7",
        "herenaG8",
        "herenaG12",
        "herenaG22",
        "herenaG23",
        "herenaG20",
        "herenaG21",
      ],
      common_event_id: 814,
      switch_id: 1014,
      thumbnail: "tn14",
    },
    15: {
      title: "ヘレナ×ゴブリンSEX恋",
      pictures: [
        "herenaG1",
        "herenaG2",
        "herenaG3",
        "herenaG4",
        "herenaG5",
        "herenaG6",
        "herenaG7",
        "herenaG8",
        "herenaG12",
        "herenaG22",
        "herenaG23",
        "herenaG20",
        "herenaG21",
      ],
      common_event_id: 815,
      switch_id: 1015,
      thumbnail: "tn15",
    },
    16: {
      title: "ヘレナ×ゴブリンAF",
      pictures: [
        "herenaG1",
        "herenaG2",
        "herenaG3",
        "herenaG4",
        "herenaG9",
        "herenaG10",
        "herenaG11",
        "herenaG13",
        "herenaG14",
        "herenaG15",
        "herenaG17",
        "herenaG18",
        "herenaG19",
      ],
      common_event_id: 816,
      switch_id: 1016,
      thumbnail: "tn16",
    },
    17: {
      title: "ヘレナ×ゴブリンAF淫",
      pictures: [
        "herenaG1",
        "herenaG2",
        "herenaG3",
        "herenaG4",
        "herenaG9",
        "herenaG10",
        "herenaG11",
        "herenaG13",
        "herenaG14",
        "herenaG15",
        "herenaG17",
        "herenaG18",
        "herenaG19",
      ],
      common_event_id: 817,
      switch_id: 1017,
      thumbnail: "tn17",
    },
    18: {
      title: "ヘレナ×ゴブリンAF恋",
      pictures: [
        "herenaG1",
        "herenaG2",
        "herenaG3",
        "herenaG4",
        "herenaG9",
        "herenaG10",
        "herenaG11",
        "herenaG13",
        "herenaG14",
        "herenaG15",
        "herenaG17",
        "herenaG18",
        "herenaG19",
      ],
      common_event_id: 818,
      switch_id: 1018,
      thumbnail: "tn18",
    },
    19: {
      title: "ミコ×ゴブリンSEX",
      pictures: [
        "mikoG1",
        "mikoG2",
        "mikoG3",
        "mikoG4",
        "mikoG5",
        "mikoG6",
        "mikoG6_2",
        "mikoG7",
        "mikoG8",
        "mikoG9",
        "mikoG10",
        "mikoG11",
      ],
      common_event_id: 819,
      switch_id: 1019,
      thumbnail: "tn19",
    },
    20: {
      title: "ミコ×ゴブリンSEX淫",
      pictures: [
        "mikoG1",
        "mikoG2",
        "mikoG3",
        "mikoG4",
        "mikoG5",
        "mikoG6",
        "mikoG6_2",
        "mikoG7",
        "mikoG8",
        "mikoG9",
        "mikoG10",
        "mikoG11",
      ],
      common_event_id: 820,
      switch_id: 1020,
      thumbnail: "tn20",
    },
    21: {
      title: "ミコ×ゴブリンSEX恋",
      pictures: [
        "mikoG1",
        "mikoG2",
        "mikoG3",
        "mikoG4",
        "mikoG5",
        "mikoG6",
        "mikoG6_2",
        "mikoG7",
        "mikoG8",
        "mikoG9",
        "mikoG10",
        "mikoG11",
      ],
      common_event_id: 821,
      switch_id: 1021,
      thumbnail: "tn21",
    },
    22: {
      title: "ミコ×ゴブリンAF",
      pictures: [
        "mikoG1",
        "mikoG2",
        "mikoG3",
        "mikoG4",
        "mikoG5",
        "mikoG12",
        "mikoG12_2",
        "mikoG13",
        "mikoG14",
        "mikoG15",
        "mikoG16",
        "mikoG17",
      ],
      common_event_id: 822,
      switch_id: 1022,
      thumbnail: "tn22",
    },
    23: {
      title: "ミコ×ゴブリンAF淫",
      pictures: [
        "mikoG1",
        "mikoG2",
        "mikoG3",
        "mikoG4",
        "mikoG5",
        "mikoG12",
        "mikoG12_2",
        "mikoG13",
        "mikoG14",
        "mikoG15",
        "mikoG16",
        "mikoG17",
      ],
      common_event_id: 823,
      switch_id: 1023,
      thumbnail: "tn23",
    },
    24: {
      title: "ミコ×ゴブリンAF恋",
      pictures: [
        "mikoG1",
        "mikoG2",
        "mikoG3",
        "mikoG4",
        "mikoG5",
        "mikoG12",
        "mikoG12_2",
        "mikoG13",
        "mikoG14",
        "mikoG15",
        "mikoG16",
        "mikoG17",
      ],
      common_event_id: 824,
      switch_id: 1024,
      thumbnail: "tn24",
    },
    25: {
      title: "リッカ×エビルプラントSEX",
      pictures: [
        "rikkaP11",
        "rikkaP12",
        "rikkaP21",
        "rikkaP22",
        "rikkaP23",
        "rikkaP31",
        "rikkaP32",
        "rikkaP41",
        "rikkaP42",
        "rikkaP43",
        "rikkaP51",
        "rikkaP52",
        "rikkaP53",
        "rikkaP54",
        "rikkaP55",
        "rikkaP61",
        "rikkaP62",
      ],
      common_event_id: 825,
      switch_id: 1025,
      thumbnail: "tn25",
    },
    26: {
      title: "リッカ×エビルプラントSEX淫",
      pictures: [
        "rikkaP11",
        "rikkaP12",
        "rikkaP21",
        "rikkaP22",
        "rikkaP23",
        "rikkaP31",
        "rikkaP32",
        "rikkaP41",
        "rikkaP42",
        "rikkaP43",
        "rikkaP51",
        "rikkaP52",
        "rikkaP53",
        "rikkaP54",
        "rikkaP55",
        "rikkaP61",
        "rikkaP62",
      ],
      common_event_id: 826,
      switch_id: 1026,
      thumbnail: "tn26",
    },
    27: {
      title: "リッカ×エビルプラントSEX恋",
      pictures: [
        "rikkaP11",
        "rikkaP12",
        "rikkaP21",
        "rikkaP22",
        "rikkaP23",
        "rikkaP31",
        "rikkaP32",
        "rikkaP41",
        "rikkaP42",
        "rikkaP43",
        "rikkaP51",
        "rikkaP52",
        "rikkaP53",
        "rikkaP54",
        "rikkaP55",
        "rikkaP61",
        "rikkaP62",
      ],
      common_event_id: 827,
      switch_id: 1027,
      thumbnail: "tn27",
    },
    28: {
      title: "シーナ×エビルプラントSEX",
      pictures: [
        "sinaP11",
        "sinaP12",
        "sinaP21",
        "sinaP22",
        "sinaP31",
        "sinaP32",
        "sinaP41",
        "sinaP42",
        "sinaP43",
        "sinaP44",
        "sinaP45",
        "sinaP46",
        "sinaP47",
        "sinaP48",
        "sinaP51",
        "sinaP52",
      ],
      common_event_id: 828,
      switch_id: 1028,
      thumbnail: "tn28",
    },
    29: {
      title: "シーナ×エビルプラントSEX淫",
      pictures: [
        "sinaP11",
        "sinaP12",
        "sinaP21",
        "sinaP22",
        "sinaP31",
        "sinaP32",
        "sinaP41",
        "sinaP42",
        "sinaP43",
        "sinaP44",
        "sinaP45",
        "sinaP46",
        "sinaP47",
        "sinaP48",
        "sinaP51",
        "sinaP52",
      ],
      common_event_id: 829,
      switch_id: 1029,
      thumbnail: "tn29",
    },
    30: {
      title: "シーナ×エビルプラントSEX恋",
      pictures: [
        "sinaP11",
        "sinaP12",
        "sinaP21",
        "sinaP22",
        "sinaP31",
        "sinaP32",
        "sinaP41",
        "sinaP42",
        "sinaP43",
        "sinaP44",
        "sinaP45",
        "sinaP46",
        "sinaP47",
        "sinaP48",
        "sinaP51",
        "sinaP52",
      ],
      common_event_id: 830,
      switch_id: 1030,
      thumbnail: "tn30",
    },
    31: {
      title: "ヘレナ×エビルプラントSEX",
      pictures: [
        "herenaP11",
        "herenaP12",
        "herenaP21",
        "herenaP22",
        "herenaP23",
        "herenaP31",
        "herenaP32",
        "herenaP33",
        "herenaP34",
        "herenaP35",
        "herenaP36",
        "herenaP37",
        "herenaP41",
        "herenaP42",
        "herenaP43",
      ],
      common_event_id: 831,
      switch_id: 1031,
      thumbnail: "tn31",
    },
    32: {
      title: "ヘレナ×エビルプラントSEX淫",
      pictures: [
        "herenaP11",
        "herenaP12",
        "herenaP21",
        "herenaP22",
        "herenaP23",
        "herenaP31",
        "herenaP32",
        "herenaP33",
        "herenaP34",
        "herenaP35",
        "herenaP36",
        "herenaP37",
        "herenaP41",
        "herenaP42",
        "herenaP43",
      ],
      common_event_id: 832,
      switch_id: 1032,
      thumbnail: "tn32",
    },
    33: {
      title: "ヘレナ×エビルプラントSEX恋",
      pictures: [
        "herenaP11",
        "herenaP12",
        "herenaP21",
        "herenaP22",
        "herenaP23",
        "herenaP31",
        "herenaP32",
        "herenaP33",
        "herenaP34",
        "herenaP35",
        "herenaP36",
        "herenaP37",
        "herenaP41",
        "herenaP42",
        "herenaP43",
      ],
      common_event_id: 833,
      switch_id: 1033,
      thumbnail: "tn33",
    },
    34: {
      title: "ミコ×エビルプラントSEX",
      pictures: [
        "mikoP11",
        "mikoP12",
        "mikoP21",
        "mikoP22",
        "mikoP31",
        "mikoP32",
        "mikoP33",
        "mikoP41",
        "mikoP42",
        "mikoP43",
        "mikoP44",
        "mikoP45",
        "mikoP46",
        "mikoP47",
        "mikoP48",
        "mikoP51",
        "mikoP52",
        "mikoP53",
      ],
      common_event_id: 834,
      switch_id: 1034,
      thumbnail: "tn34",
    },
    35: {
      title: "ミコ×エビルプラントSEX淫",
      pictures: [
        "mikoP11",
        "mikoP12",
        "mikoP21",
        "mikoP22",
        "mikoP31",
        "mikoP32",
        "mikoP33",
        "mikoP41",
        "mikoP42",
        "mikoP43",
        "mikoP44",
        "mikoP45",
        "mikoP46",
        "mikoP47",
        "mikoP48",
        "mikoP51",
        "mikoP52",
        "mikoP53",
      ],
      common_event_id: 835,
      switch_id: 1035,
      thumbnail: "tn35",
    },
    36: {
      title: "ミコ×エビルプラントSEX恋",
      pictures: [
        "mikoP11",
        "mikoP12",
        "mikoP21",
        "mikoP22",
        "mikoP31",
        "mikoP32",
        "mikoP33",
        "mikoP41",
        "mikoP42",
        "mikoP43",
        "mikoP44",
        "mikoP45",
        "mikoP46",
        "mikoP47",
        "mikoP48",
        "mikoP51",
        "mikoP52",
        "mikoP53",
      ],
      common_event_id: 836,
      switch_id: 1036,
      thumbnail: "tn36",
    },
    37: {
      title: "リッカ×巨大蜘蛛SEX",
      pictures: [
        "rikkaKumo11",
        "rikkaKumo12",
        "rikkaKumo21",
        "rikkaKumo22",
        "rikkaKumo23",
        "rikkaKumo24",
        "rikkaKumo31",
        "rikkaKumo32",
        "rikkaKumo33",
        "rikkaKumo34",
        "rikkaKumo35",
        "rikkaKumo36",
        "rikkaKumo37",
        "rikkaKumo38",
        "rikkaKumo39",
        "rikkaKumo40",
        "rikkaKumo41",
        "rikkaKumo42",
        "rikkaKumo43",
      ],
      common_event_id: 837,
      switch_id: 1037,
      thumbnail: "tn37",
    },
    38: {
      title: "リッカ×巨大蜘蛛SEX淫",
      pictures: [
        "rikkaKumo11",
        "rikkaKumo12",
        "rikkaKumo21",
        "rikkaKumo22",
        "rikkaKumo23",
        "rikkaKumo24",
        "rikkaKumo31",
        "rikkaKumo32",
        "rikkaKumo33",
        "rikkaKumo34",
        "rikkaKumo35",
        "rikkaKumo36",
        "rikkaKumo37",
        "rikkaKumo38",
        "rikkaKumo39",
        "rikkaKumo40",
        "rikkaKumo41",
        "rikkaKumo42",
        "rikkaKumo43",
      ],
      common_event_id: 838,
      switch_id: 1038,
      thumbnail: "tn38",
    },
    39: {
      title: "リッカ×巨大蜘蛛SEX恋",
      pictures: [
        "rikkaKumo11",
        "rikkaKumo12",
        "rikkaKumo21",
        "rikkaKumo22",
        "rikkaKumo23",
        "rikkaKumo24",
        "rikkaKumo31",
        "rikkaKumo32",
        "rikkaKumo33",
        "rikkaKumo34",
        "rikkaKumo35",
        "rikkaKumo36",
        "rikkaKumo37",
        "rikkaKumo38",
        "rikkaKumo39",
        "rikkaKumo40",
        "rikkaKumo41",
        "rikkaKumo42",
        "rikkaKumo43",
      ],
      common_event_id: 839,
      switch_id: 1039,
      thumbnail: "tn39",
    },
    40: {
      title: "リッカ×巨大蜘蛛AF",
      pictures: [
        "rikkaKumo11",
        "rikkaKumo12",
        "rikkaKumo21",
        "rikkaKumo22",
        "rikkaKumo23",
        "rikkaKumo24",
        "rikkaKumo31",
        "rikkaKumo32",
        "rikkaKumo33",
        "rikkaKumo34",
        "rikkaKumo35",
        "rikkaKumo36",
        "rikkaKumo37",
        "rikkaKumo38",
        "rikkaKumo39",
        "rikkaKumo40",
        "rikkaKumo41",
        "rikkaKumo42",
        "rikkaKumo43",
      ],
      common_event_id: 840,
      switch_id: 1040,
      thumbnail: "tn40",
    },
    41: {
      title: "リッカ×巨大蜘蛛AF淫",
      pictures: [
        "rikkaKumo11",
        "rikkaKumo12",
        "rikkaKumo21",
        "rikkaKumo22",
        "rikkaKumo23",
        "rikkaKumo24",
        "rikkaKumo31",
        "rikkaKumo32",
        "rikkaKumo33",
        "rikkaKumo34",
        "rikkaKumo35",
        "rikkaKumo36",
        "rikkaKumo37",
        "rikkaKumo38",
        "rikkaKumo39",
        "rikkaKumo40",
        "rikkaKumo41",
        "rikkaKumo42",
        "rikkaKumo43",
      ],
      common_event_id: 841,
      switch_id: 1041,
      thumbnail: "tn41",
    },
    42: {
      title: "リッカ×巨大蜘蛛AF恋",
      pictures: [
        "rikkaKumo11",
        "rikkaKumo12",
        "rikkaKumo21",
        "rikkaKumo22",
        "rikkaKumo23",
        "rikkaKumo24",
        "rikkaKumo31",
        "rikkaKumo32",
        "rikkaKumo33",
        "rikkaKumo34",
        "rikkaKumo35",
        "rikkaKumo36",
        "rikkaKumo37",
        "rikkaKumo38",
        "rikkaKumo39",
        "rikkaKumo40",
        "rikkaKumo41",
        "rikkaKumo42",
        "rikkaKumo43",
      ],
      common_event_id: 842,
      switch_id: 1042,
      thumbnail: "tn42",
    },
    43: {
      title: "シーナ×巨大蜘蛛SEX",
      pictures: [
        "sinaKumo11",
        "sinaKumo12",
        "sinaKumo21",
        "sinaKumo22",
        "sinaKumo23",
        "sinaKumo31",
        "sinaKumo32",
        "sinaKumo33",
        "sinaKumo34",
        "sinaKumo35",
        "sinaKumo36",
        "sinaKumo37",
        "sinaKumo38",
        "sinaKumo39",
        "sinaKumo51",
        "sinaKumo52",
        "sinaKumo53",
      ],
      common_event_id: 843,
      switch_id: 1043,
      thumbnail: "tn43",
    },
    44: {
      title: "シーナ×巨大蜘蛛SEX淫",
      pictures: [
        "sinaKumo11",
        "sinaKumo12",
        "sinaKumo21",
        "sinaKumo22",
        "sinaKumo23",
        "sinaKumo31",
        "sinaKumo32",
        "sinaKumo33",
        "sinaKumo34",
        "sinaKumo35",
        "sinaKumo36",
        "sinaKumo37",
        "sinaKumo38",
        "sinaKumo39",
        "sinaKumo51",
        "sinaKumo52",
        "sinaKumo53",
      ],
      common_event_id: 844,
      switch_id: 1044,
      thumbnail: "tn44",
    },
    45: {
      title: "シーナ×巨大蜘蛛SEX恋",
      pictures: [
        "sinaKumo11",
        "sinaKumo12",
        "sinaKumo21",
        "sinaKumo22",
        "sinaKumo23",
        "sinaKumo31",
        "sinaKumo32",
        "sinaKumo33",
        "sinaKumo34",
        "sinaKumo35",
        "sinaKumo36",
        "sinaKumo37",
        "sinaKumo38",
        "sinaKumo39",
        "sinaKumo51",
        "sinaKumo52",
        "sinaKumo53",
      ],
      common_event_id: 845,
      switch_id: 1045,
      thumbnail: "tn45",
    },
    46: {
      title: "シーナ×巨大蜘蛛AF",
      pictures: [
        "sinaKumo11",
        "sinaKumo12",
        "sinaKumo21",
        "sinaKumo22",
        "sinaKumo23",
        "sinaKumo41",
        "sinaKumo42",
        "sinaKumo43",
        "sinaKumo44",
        "sinaKumo45",
        "sinaKumo46",
        "sinaKumo47",
        "sinaKumo48",
        "sinaKumo49",
        "sinaKumo61",
        "sinaKumo62",
        "sinaKumo63",
      ],
      common_event_id: 846,
      switch_id: 1046,
      thumbnail: "tn46",
    },
    47: {
      title: "シーナ×巨大蜘蛛AF淫",
      pictures: [
        "sinaKumo11",
        "sinaKumo12",
        "sinaKumo21",
        "sinaKumo22",
        "sinaKumo23",
        "sinaKumo41",
        "sinaKumo42",
        "sinaKumo43",
        "sinaKumo44",
        "sinaKumo45",
        "sinaKumo46",
        "sinaKumo47",
        "sinaKumo48",
        "sinaKumo49",
        "sinaKumo61",
        "sinaKumo62",
        "sinaKumo63",
      ],
      common_event_id: 847,
      switch_id: 1047,
      thumbnail: "tn47",
    },
    48: {
      title: "シーナ×巨大蜘蛛AF恋",
      pictures: [
        "sinaKumo11",
        "sinaKumo12",
        "sinaKumo21",
        "sinaKumo22",
        "sinaKumo23",
        "sinaKumo41",
        "sinaKumo42",
        "sinaKumo43",
        "sinaKumo44",
        "sinaKumo45",
        "sinaKumo46",
        "sinaKumo47",
        "sinaKumo48",
        "sinaKumo49",
        "sinaKumo61",
        "sinaKumo62",
        "sinaKumo63",
      ],
      common_event_id: 848,
      switch_id: 1048,
      thumbnail: "tn48",
    },
    49: {
      title: "ヘレナ×巨大蜘蛛SEX",
      pictures: [
        "herenaKumo11",
        "herenaKumo12",
        "herenaKumo13",
        "herenaKumo21",
        "herenaKumo22",
        "herenaKumo23",
        "herenaKumo24",
        "herenaKumo31",
        "herenaKumo32",
        "herenaKumo33",
        "herenaKumo34",
        "herenaKumo35",
        "herenaKumo36",
        "herenaKumo37",
        "herenaKumo38",
        "herenaKumo39",
        "herenaKumo41",
        "herenaKumo42",
        "herenaKumo43",
        "herenaKumo44",
        "herenaKumo310",
        "herenaKumo311",
      ],
      common_event_id: 849,
      switch_id: 1049,
      thumbnail: "tn49",
    },
    50: {
      title: "ヘレナ×巨大蜘蛛SEX淫",
      pictures: [
        "herenaKumo11",
        "herenaKumo12",
        "herenaKumo13",
        "herenaKumo21",
        "herenaKumo22",
        "herenaKumo23",
        "herenaKumo24",
        "herenaKumo31",
        "herenaKumo32",
        "herenaKumo33",
        "herenaKumo34",
        "herenaKumo35",
        "herenaKumo36",
        "herenaKumo37",
        "herenaKumo38",
        "herenaKumo39",
        "herenaKumo41",
        "herenaKumo42",
        "herenaKumo43",
        "herenaKumo44",
        "herenaKumo310",
        "herenaKumo311",
      ],
      common_event_id: 850,
      switch_id: 1050,
      thumbnail: "tn50",
    },
    51: {
      title: "ヘレナ×巨大蜘蛛SEX恋",
      pictures: [
        "herenaKumo11",
        "herenaKumo12",
        "herenaKumo13",
        "herenaKumo21",
        "herenaKumo22",
        "herenaKumo23",
        "herenaKumo24",
        "herenaKumo31",
        "herenaKumo32",
        "herenaKumo33",
        "herenaKumo34",
        "herenaKumo35",
        "herenaKumo36",
        "herenaKumo37",
        "herenaKumo38",
        "herenaKumo39",
        "herenaKumo41",
        "herenaKumo42",
        "herenaKumo43",
        "herenaKumo44",
        "herenaKumo310",
        "herenaKumo311",
      ],
      common_event_id: 851,
      switch_id: 1051,
      thumbnail: "tn51",
    },
    52: {
      title: "ヘレナ×巨大蜘蛛AF",
      pictures: [
        "herenaKumo11",
        "herenaKumo12",
        "herenaKumo13",
        "herenaKumo21",
        "herenaKumo22",
        "herenaKumo23",
        "herenaKumo24",
        "herenaKumo31",
        "herenaKumo32",
        "herenaKumo33",
        "herenaKumo34",
        "herenaKumo35",
        "herenaKumo36",
        "herenaKumo37",
        "herenaKumo38",
        "herenaKumo39",
        "herenaKumo41",
        "herenaKumo42",
        "herenaKumo43",
        "herenaKumo44",
        "herenaKumo310",
        "herenaKumo311",
      ],
      common_event_id: 852,
      switch_id: 1052,
      thumbnail: "tn52",
    },
    53: {
      title: "ヘレナ×巨大蜘蛛AF淫",
      pictures: [
        "herenaKumo11",
        "herenaKumo12",
        "herenaKumo13",
        "herenaKumo21",
        "herenaKumo22",
        "herenaKumo23",
        "herenaKumo24",
        "herenaKumo31",
        "herenaKumo32",
        "herenaKumo33",
        "herenaKumo34",
        "herenaKumo35",
        "herenaKumo36",
        "herenaKumo37",
        "herenaKumo38",
        "herenaKumo39",
        "herenaKumo41",
        "herenaKumo42",
        "herenaKumo43",
        "herenaKumo44",
        "herenaKumo310",
        "herenaKumo311",
      ],
      common_event_id: 853,
      switch_id: 1053,
      thumbnail: "tn53",
    },
    54: {
      title: "ヘレナ×巨大蜘蛛AF恋",
      pictures: [
        "herenaKumo11",
        "herenaKumo12",
        "herenaKumo13",
        "herenaKumo21",
        "herenaKumo22",
        "herenaKumo23",
        "herenaKumo24",
        "herenaKumo31",
        "herenaKumo32",
        "herenaKumo33",
        "herenaKumo34",
        "herenaKumo35",
        "herenaKumo36",
        "herenaKumo37",
        "herenaKumo38",
        "herenaKumo39",
        "herenaKumo41",
        "herenaKumo42",
        "herenaKumo43",
        "herenaKumo44",
        "herenaKumo310",
        "herenaKumo311",
      ],
      common_event_id: 854,
      switch_id: 1054,
      thumbnail: "tn54",
    },
    55: {
      title: "ミコ×巨大蜘蛛SEX",
      pictures: [
        "mikoKumo11",
        "mikoKumo12",
        "mikoKumo21",
        "mikoKumo22",
        "mikoKumo31",
        "mikoKumo32",
        "mikoKumo33",
        "mikoKumo34",
        "mikoKumo35",
        "mikoKumo36",
        "mikoKumo37",
        "mikoKumo38",
        "mikoKumo39",
        "mikoKumo40",
        "mikoKumo41",
        "mikoKumo42",
        "mikoKumo43",
        "mikoKumo44",
      ],
      common_event_id: 855,
      switch_id: 1055,
      thumbnail: "tn55",
    },
    56: {
      title: "ミコ×巨大蜘蛛SEX淫",
      pictures: [
        "mikoKumo11",
        "mikoKumo12",
        "mikoKumo21",
        "mikoKumo22",
        "mikoKumo31",
        "mikoKumo32",
        "mikoKumo33",
        "mikoKumo34",
        "mikoKumo35",
        "mikoKumo36",
        "mikoKumo37",
        "mikoKumo38",
        "mikoKumo39",
        "mikoKumo40",
        "mikoKumo41",
        "mikoKumo42",
        "mikoKumo43",
        "mikoKumo44",
      ],
      common_event_id: 856,
      switch_id: 1056,
      thumbnail: "tn56",
    },
    57: {
      title: "ミコ×巨大蜘蛛SEX恋",
      pictures: [
        "mikoKumo11",
        "mikoKumo12",
        "mikoKumo21",
        "mikoKumo22",
        "mikoKumo31",
        "mikoKumo32",
        "mikoKumo33",
        "mikoKumo34",
        "mikoKumo35",
        "mikoKumo36",
        "mikoKumo37",
        "mikoKumo38",
        "mikoKumo39",
        "mikoKumo40",
        "mikoKumo41",
        "mikoKumo42",
        "mikoKumo43",
        "mikoKumo44",
      ],
      common_event_id: 857,
      switch_id: 1057,
      thumbnail: "tn57",
    },
    58: {
      title: "ミコ×巨大蜘蛛AF",
      pictures: [
        "mikoKumo11",
        "mikoKumo12",
        "mikoKumo21",
        "mikoKumo22",
        "mikoKumo31",
        "mikoKumo32",
        "mikoKumo33",
        "mikoKumo34",
        "mikoKumo35",
        "mikoKumo36",
        "mikoKumo37",
        "mikoKumo38",
        "mikoKumo39",
        "mikoKumo40",
        "mikoKumo41",
        "mikoKumo42",
        "mikoKumo43",
        "mikoKumo44",
      ],
      common_event_id: 858,
      switch_id: 1058,
      thumbnail: "tn58",
    },
    59: {
      title: "ミコ×巨大蜘蛛AF淫",
      pictures: [
        "mikoKumo11",
        "mikoKumo12",
        "mikoKumo21",
        "mikoKumo22",
        "mikoKumo31",
        "mikoKumo32",
        "mikoKumo33",
        "mikoKumo34",
        "mikoKumo35",
        "mikoKumo36",
        "mikoKumo37",
        "mikoKumo38",
        "mikoKumo39",
        "mikoKumo40",
        "mikoKumo41",
        "mikoKumo42",
        "mikoKumo43",
        "mikoKumo44",
      ],
      common_event_id: 859,
      switch_id: 1059,
      thumbnail: "tn59",
    },
    60: {
      title: "ミコ×巨大蜘蛛AF恋",
      pictures: [
        "mikoKumo11",
        "mikoKumo12",
        "mikoKumo21",
        "mikoKumo22",
        "mikoKumo31",
        "mikoKumo32",
        "mikoKumo33",
        "mikoKumo34",
        "mikoKumo35",
        "mikoKumo36",
        "mikoKumo37",
        "mikoKumo38",
        "mikoKumo39",
        "mikoKumo40",
        "mikoKumo41",
        "mikoKumo42",
        "mikoKumo43",
        "mikoKumo44",
      ],
      common_event_id: 860,
      switch_id: 1060,
      thumbnail: "tn60",
    },
    61: {
      title: "リッカ×魔犬SEX",
      pictures: [
        "rikkaMaken_1_1",
        "rikkaMaken_1_2",
        "rikkaMaken_1_6",
        "rikkaMaken_1_11",
        "rikkaMaken_1_18",
        "rikkaMaken_2_3",
        "rikkaMaken_2_4",
        "rikkaMaken_2_5",
        "rikkaMaken_2_6",
        "rikkaMaken_2_7",
        "rikkaMaken_2_8",
        "rikkaMaken_2_10",
        "rikkaMaken_2_11",
        "rikkaMaken_2_15",
        "rikkaMaken_2_19",
        "rikkaMaken_2_22",
        "rikkaMaken_3_5",
        "rikkaMaken_3_9",
        "rikkaMaken_3_10",
        "rikkaMaken_3_11",
        "rikkaMaken_3_12",
        "rikkaMaken_3_13",
        "rikkaMaken_3_14",
        "rikkaMaken_3_15",
        "rikkaMaken_3_16",
        "rikkaMaken_3_17",
        "rikkaMaken_3_21",
        "rikkaMaken_3_22",
        "rikkaMaken_3_23",
        "rikkaMaken_3_24",
        "rikkaMaken_3_25",
        "rikkaMaken_3_26",
        "rikkaMaken_3_27",
        "rikkaMaken_4_23",
        "rikkaMaken_4_24",
        "rikkaMaken_4_25",
        "rikkaMaken_4_27",
      ],
      common_event_id: 861,
      switch_id: 1061,
      thumbnail: "tn61",
    },
    62: {
      title: "リッカ×魔犬SEX淫",
      pictures: [
        "rikkaMaken_1_1",
        "rikkaMaken_1_2",
        "rikkaMaken_1_6",
        "rikkaMaken_1_11",
        "rikkaMaken_1_18",
        "rikkaMaken_2_3",
        "rikkaMaken_2_4",
        "rikkaMaken_2_5",
        "rikkaMaken_2_6",
        "rikkaMaken_2_7",
        "rikkaMaken_2_8",
        "rikkaMaken_2_10",
        "rikkaMaken_2_11",
        "rikkaMaken_2_15",
        "rikkaMaken_2_19",
        "rikkaMaken_2_22",
        "rikkaMaken_3_5",
        "rikkaMaken_3_9",
        "rikkaMaken_3_10",
        "rikkaMaken_3_11",
        "rikkaMaken_3_12",
        "rikkaMaken_3_13",
        "rikkaMaken_3_14",
        "rikkaMaken_3_15",
        "rikkaMaken_3_16",
        "rikkaMaken_3_17",
        "rikkaMaken_3_21",
        "rikkaMaken_3_22",
        "rikkaMaken_3_23",
        "rikkaMaken_3_24",
        "rikkaMaken_3_25",
        "rikkaMaken_3_26",
        "rikkaMaken_3_27",
        "rikkaMaken_4_23",
        "rikkaMaken_4_24",
        "rikkaMaken_4_25",
        "rikkaMaken_4_27",
      ],
      common_event_id: 862,
      switch_id: 1062,
      thumbnail: "tn62",
    },
    63: {
      title: "リッカ×魔犬SEX恋",
      pictures: [
        "rikkaMaken_1_1",
        "rikkaMaken_1_2",
        "rikkaMaken_1_6",
        "rikkaMaken_1_11",
        "rikkaMaken_1_18",
        "rikkaMaken_2_3",
        "rikkaMaken_2_4",
        "rikkaMaken_2_5",
        "rikkaMaken_2_6",
        "rikkaMaken_2_7",
        "rikkaMaken_2_8",
        "rikkaMaken_2_10",
        "rikkaMaken_2_11",
        "rikkaMaken_2_15",
        "rikkaMaken_2_19",
        "rikkaMaken_2_22",
        "rikkaMaken_3_5",
        "rikkaMaken_3_9",
        "rikkaMaken_3_10",
        "rikkaMaken_3_11",
        "rikkaMaken_3_12",
        "rikkaMaken_3_13",
        "rikkaMaken_3_14",
        "rikkaMaken_3_15",
        "rikkaMaken_3_16",
        "rikkaMaken_3_17",
        "rikkaMaken_3_21",
        "rikkaMaken_3_22",
        "rikkaMaken_3_23",
        "rikkaMaken_3_24",
        "rikkaMaken_3_25",
        "rikkaMaken_3_26",
        "rikkaMaken_3_27",
        "rikkaMaken_4_23",
        "rikkaMaken_4_24",
        "rikkaMaken_4_25",
        "rikkaMaken_4_27",
      ],
      common_event_id: 863,
      switch_id: 1063,
      thumbnail: "tn63",
    },
    64: {
      title: "シーナ×魔犬SEX",
      pictures: [
        "sinaMaken_1_2",
        "sinaMaken_1_4",
        "sinaMaken_1_9",
        "sinaMaken_2_1",
        "sinaMaken_2_2",
        "sinaMaken_2_3",
        "sinaMaken_2_4",
        "sinaMaken_2_5",
        "sinaMaken_2_8",
        "sinaMaken_2_9",
        "sinaMaken_2_10",
        "sinaMaken_2_11",
        "sinaMaken_3_1",
        "sinaMaken_3_2",
        "sinaMaken_3_3",
        "sinaMaken_3_4",
        "sinaMaken_3_5",
        "sinaMaken_3_6",
        "sinaMaken_3_7",
        "sinaMaken_3_8",
        "sinaMaken_3_9",
        "sinaMaken_3_10",
        "sinaMaken_3_11",
        "sinaMaken_3_12",
        "sinaMaken_3_13",
        "sinaMaken_3_14",
        "sinaMaken_3_15",
        "sinaMaken_4_11",
        "sinaMaken_4_12",
        "sinaMaken_4_14",
        "sinaMaken_4_15",
      ],
      common_event_id: 864,
      switch_id: 1064,
      thumbnail: "tn64",
    },
    65: {
      title: "シーナ×魔犬SEX淫",
      pictures: [
        "sinaMaken_1_2",
        "sinaMaken_1_4",
        "sinaMaken_1_9",
        "sinaMaken_2_1",
        "sinaMaken_2_2",
        "sinaMaken_2_3",
        "sinaMaken_2_4",
        "sinaMaken_2_5",
        "sinaMaken_2_8",
        "sinaMaken_2_9",
        "sinaMaken_2_10",
        "sinaMaken_2_11",
        "sinaMaken_3_1",
        "sinaMaken_3_2",
        "sinaMaken_3_3",
        "sinaMaken_3_4",
        "sinaMaken_3_5",
        "sinaMaken_3_6",
        "sinaMaken_3_7",
        "sinaMaken_3_8",
        "sinaMaken_3_9",
        "sinaMaken_3_10",
        "sinaMaken_3_11",
        "sinaMaken_3_12",
        "sinaMaken_3_13",
        "sinaMaken_3_14",
        "sinaMaken_3_15",
        "sinaMaken_4_11",
        "sinaMaken_4_12",
        "sinaMaken_4_14",
        "sinaMaken_4_15",
      ],
      common_event_id: 865,
      switch_id: 1065,
      thumbnail: "tn65",
    },
    66: {
      title: "シーナ×魔犬SEX恋",
      pictures: [
        "sinaMaken_1_2",
        "sinaMaken_1_4",
        "sinaMaken_1_9",
        "sinaMaken_2_1",
        "sinaMaken_2_2",
        "sinaMaken_2_3",
        "sinaMaken_2_4",
        "sinaMaken_2_5",
        "sinaMaken_2_8",
        "sinaMaken_2_9",
        "sinaMaken_2_10",
        "sinaMaken_2_11",
        "sinaMaken_3_1",
        "sinaMaken_3_2",
        "sinaMaken_3_3",
        "sinaMaken_3_4",
        "sinaMaken_3_5",
        "sinaMaken_3_6",
        "sinaMaken_3_7",
        "sinaMaken_3_8",
        "sinaMaken_3_9",
        "sinaMaken_3_10",
        "sinaMaken_3_11",
        "sinaMaken_3_12",
        "sinaMaken_3_13",
        "sinaMaken_3_14",
        "sinaMaken_3_15",
        "sinaMaken_4_11",
        "sinaMaken_4_12",
        "sinaMaken_4_14",
        "sinaMaken_4_15",
      ],
      common_event_id: 866,
      switch_id: 1066,
      thumbnail: "tn66",
    },
    67: {
      title: "ヘレナ×魔犬SEX",
      pictures: [
        "herenaMaken_1_1",
        "herenaMaken_1_3",
        "herenaMaken_1_7",
        "herenaMaken_1_15",
        "herenaMaken_2_1",
        "herenaMaken_2_3",
        "herenaMaken_2_6",
        "herenaMaken_2_7",
        "herenaMaken_2_8",
        "herenaMaken_2_9",
        "herenaMaken_2_15",
        "herenaMaken_2_16",
        "herenaMaken_3_1",
        "herenaMaken_3_2",
        "herenaMaken_3_3",
        "herenaMaken_3_4",
        "herenaMaken_3_5",
        "herenaMaken_3_6",
        "herenaMaken_3_7",
        "herenaMaken_3_8",
        "herenaMaken_3_9",
        "herenaMaken_3_10",
        "herenaMaken_3_11",
        "herenaMaken_3_12",
        "herenaMaken_3_13",
        "herenaMaken_3_14",
        "herenaMaken_3_15",
        "herenaMaken_3_16",
        "herenaMaken_3_17",
        "herenaMaken_3_18",
        "herenaMaken_3_19",
        "herenaMaken_3_20",
        "herenaMaken_3_21",
        "herenaMaken_4_6",
        "herenaMaken_4_11",
        "herenaMaken_4_16",
        "herenaMaken_4_17",
        "herenaMaken_4_18",
        "herenaMaken_4_19",
        "herenaMaken_4_20",
        "herenaMaken_4_21",
      ],
      common_event_id: 867,
      switch_id: 1067,
      thumbnail: "tn67",
    },
    68: {
      title: "ヘレナ×魔犬SEX淫",
      pictures: [
        "herenaMaken_1_1",
        "herenaMaken_1_3",
        "herenaMaken_1_7",
        "herenaMaken_1_15",
        "herenaMaken_2_1",
        "herenaMaken_2_3",
        "herenaMaken_2_6",
        "herenaMaken_2_7",
        "herenaMaken_2_8",
        "herenaMaken_2_9",
        "herenaMaken_2_15",
        "herenaMaken_2_16",
        "herenaMaken_3_1",
        "herenaMaken_3_2",
        "herenaMaken_3_3",
        "herenaMaken_3_4",
        "herenaMaken_3_5",
        "herenaMaken_3_6",
        "herenaMaken_3_7",
        "herenaMaken_3_8",
        "herenaMaken_3_9",
        "herenaMaken_3_10",
        "herenaMaken_3_11",
        "herenaMaken_3_12",
        "herenaMaken_3_13",
        "herenaMaken_3_14",
        "herenaMaken_3_15",
        "herenaMaken_3_16",
        "herenaMaken_3_17",
        "herenaMaken_3_18",
        "herenaMaken_3_19",
        "herenaMaken_3_20",
        "herenaMaken_3_21",
        "herenaMaken_4_6",
        "herenaMaken_4_11",
        "herenaMaken_4_16",
        "herenaMaken_4_17",
        "herenaMaken_4_18",
        "herenaMaken_4_19",
        "herenaMaken_4_20",
        "herenaMaken_4_21",
      ],
      common_event_id: 868,
      switch_id: 1068,
      thumbnail: "tn68",
    },
    69: {
      title: "ヘレナ×魔犬SEX恋",
      pictures: [
        "herenaMaken_1_1",
        "herenaMaken_1_3",
        "herenaMaken_1_7",
        "herenaMaken_1_15",
        "herenaMaken_2_1",
        "herenaMaken_2_3",
        "herenaMaken_2_6",
        "herenaMaken_2_7",
        "herenaMaken_2_8",
        "herenaMaken_2_9",
        "herenaMaken_2_15",
        "herenaMaken_2_16",
        "herenaMaken_3_1",
        "herenaMaken_3_2",
        "herenaMaken_3_3",
        "herenaMaken_3_4",
        "herenaMaken_3_5",
        "herenaMaken_3_6",
        "herenaMaken_3_7",
        "herenaMaken_3_8",
        "herenaMaken_3_9",
        "herenaMaken_3_10",
        "herenaMaken_3_11",
        "herenaMaken_3_12",
        "herenaMaken_3_13",
        "herenaMaken_3_14",
        "herenaMaken_3_15",
        "herenaMaken_3_16",
        "herenaMaken_3_17",
        "herenaMaken_3_18",
        "herenaMaken_3_19",
        "herenaMaken_3_20",
        "herenaMaken_3_21",
        "herenaMaken_4_6",
        "herenaMaken_4_11",
        "herenaMaken_4_16",
        "herenaMaken_4_17",
        "herenaMaken_4_18",
        "herenaMaken_4_19",
        "herenaMaken_4_20",
        "herenaMaken_4_21",
      ],
      common_event_id: 869,
      switch_id: 1069,
      thumbnail: "tn69",
    },
    70: {
      title: "ミコ×魔犬SEX",
      pictures: [
        "miko_Maken_1_1",
        "miko_Maken_1_2",
        "miko_Maken_1_3",
        "miko_Maken_1_4",
        "miko_Maken_2_2",
        "miko_Maken_2_3",
        "miko_Maken_2_4",
        "miko_Maken_2_5",
        "miko_Maken_2_6",
        "miko_Maken_2_7",
        "miko_Maken_2_8",
        "miko_Maken_2_9",
        "miko_Maken_2_11",
        "miko_Maken_2_13",
        "miko_Maken_2_18",
        "miko_Maken_2_19",
        "miko_Maken_2_22",
        "miko_Maken_2_23",
        "miko_Maken_3_1",
        "miko_Maken_3_2",
        "miko_Maken_3_3",
        "miko_Maken_3_4",
        "miko_Maken_3_5",
        "miko_Maken_3_6",
        "miko_Maken_3_7",
        "miko_Maken_3_8",
        "miko_Maken_3_9",
        "miko_Maken_3_10",
        "miko_Maken_3_11",
        "miko_Maken_3_12",
        "miko_Maken_3_13",
        "miko_Maken_3_14",
        "miko_Maken_3_15",
        "miko_Maken_3_16",
        "miko_Maken_3_17",
        "miko_Maken_3_18",
        "miko_Maken_3_19",
        "miko_Maken_3_20",
        "miko_Maken_3_21",
        "miko_Maken_3_22",
        "miko_Maken_3_23",
        "miko_Maken_3_24",
        "miko_Maken_3_25",
        "miko_Maken_3_26",
        "miko_Maken_3_27",
        "miko_Maken_3_28",
        "miko_Maken_3_29",
        "miko_Maken_4_16",
        "miko_Maken_4_24",
        "miko_Maken_4_26",
        "miko_Maken_4_27",
        "miko_Maken_4_28",
        "miko_Maken_4_29",
      ],
      common_event_id: 870,
      switch_id: 1070,
      thumbnail: "tn70",
    },
    71: {
      title: "ミコ×魔犬SEX淫",
      pictures: [
        "miko_Maken_1_1",
        "miko_Maken_1_2",
        "miko_Maken_1_3",
        "miko_Maken_1_4",
        "miko_Maken_2_2",
        "miko_Maken_2_3",
        "miko_Maken_2_4",
        "miko_Maken_2_5",
        "miko_Maken_2_6",
        "miko_Maken_2_7",
        "miko_Maken_2_8",
        "miko_Maken_2_9",
        "miko_Maken_2_11",
        "miko_Maken_2_13",
        "miko_Maken_2_18",
        "miko_Maken_2_19",
        "miko_Maken_2_22",
        "miko_Maken_2_23",
        "miko_Maken_3_1",
        "miko_Maken_3_2",
        "miko_Maken_3_3",
        "miko_Maken_3_4",
        "miko_Maken_3_5",
        "miko_Maken_3_6",
        "miko_Maken_3_7",
        "miko_Maken_3_8",
        "miko_Maken_3_9",
        "miko_Maken_3_10",
        "miko_Maken_3_11",
        "miko_Maken_3_12",
        "miko_Maken_3_13",
        "miko_Maken_3_14",
        "miko_Maken_3_15",
        "miko_Maken_3_16",
        "miko_Maken_3_17",
        "miko_Maken_3_18",
        "miko_Maken_3_19",
        "miko_Maken_3_20",
        "miko_Maken_3_21",
        "miko_Maken_3_22",
        "miko_Maken_3_23",
        "miko_Maken_3_24",
        "miko_Maken_3_25",
        "miko_Maken_3_26",
        "miko_Maken_3_27",
        "miko_Maken_3_28",
        "miko_Maken_3_29",
        "miko_Maken_4_16",
        "miko_Maken_4_24",
        "miko_Maken_4_26",
        "miko_Maken_4_27",
        "miko_Maken_4_28",
        "miko_Maken_4_29",
      ],
      common_event_id: 871,
      switch_id: 1071,
      thumbnail: "tn71",
    },
    72: {
      title: "ミコ×魔犬SEX恋",
      pictures: [
        "miko_Maken_1_1",
        "miko_Maken_1_2",
        "miko_Maken_1_3",
        "miko_Maken_1_4",
        "miko_Maken_2_2",
        "miko_Maken_2_3",
        "miko_Maken_2_4",
        "miko_Maken_2_5",
        "miko_Maken_2_6",
        "miko_Maken_2_7",
        "miko_Maken_2_8",
        "miko_Maken_2_9",
        "miko_Maken_2_11",
        "miko_Maken_2_13",
        "miko_Maken_2_18",
        "miko_Maken_2_19",
        "miko_Maken_2_22",
        "miko_Maken_2_23",
        "miko_Maken_3_1",
        "miko_Maken_3_2",
        "miko_Maken_3_3",
        "miko_Maken_3_4",
        "miko_Maken_3_5",
        "miko_Maken_3_6",
        "miko_Maken_3_7",
        "miko_Maken_3_8",
        "miko_Maken_3_9",
        "miko_Maken_3_10",
        "miko_Maken_3_11",
        "miko_Maken_3_12",
        "miko_Maken_3_13",
        "miko_Maken_3_14",
        "miko_Maken_3_15",
        "miko_Maken_3_16",
        "miko_Maken_3_17",
        "miko_Maken_3_18",
        "miko_Maken_3_19",
        "miko_Maken_3_20",
        "miko_Maken_3_21",
        "miko_Maken_3_22",
        "miko_Maken_3_23",
        "miko_Maken_3_24",
        "miko_Maken_3_25",
        "miko_Maken_3_26",
        "miko_Maken_3_27",
        "miko_Maken_3_28",
        "miko_Maken_3_29",
        "miko_Maken_4_16",
        "miko_Maken_4_24",
        "miko_Maken_4_26",
        "miko_Maken_4_27",
        "miko_Maken_4_28",
        "miko_Maken_4_29",
      ],
      common_event_id: 872,
      switch_id: 1072,
      thumbnail: "tn72",
    },
    73: {
      title: "リッカ×ミノタウロスSEX",
      pictures: [
        "rikka_mino_1_2",
        "rikka_mino_1_4",
        "rikka_mino_1_5",
        "rikka_mino_1_7",
        "rikka_mino_2_2",
        "rikka_mino_2_4",
        "rikka_mino_2_5",
        "rikka_mino_2_8",
        "rikka_mino_2_18",
        "rikka_mino_2_19",
        "rikka_mino_2_20",
        "rikka_mino_3_2",
        "rikka_mino_3_3",
        "rikka_mino_3_9",
        "rikka_mino_3_13",
        "rikka_mino_3_19",
        "rikka_mino_4_1",
        "rikka_mino_4_6",
        "rikka_mino_4_8",
        "rikka_mino_4_9",
        "rikka_mino_4_11",
        "rikka_mino_4_13",
        "rikka_mino_4_14",
        "rikka_mino_4_15",
        "rikka_mino_4_16",
        "rikka_mino_4_17",
        "rikka_mino_4_18",
        "rikka_mino_4_19",
        "rikka_mino_4_21",
        "rikka_mino_4_22",
        "rikka_mino_4_23",
        "rikka_mino_4_24",
        "rikka_mino_4_25",
        "rikka_mino_4_26",
        "rikka_mino_5_2",
        "rikka_mino_5_5",
        "rikka_mino_5_6",
        "rikka_mino_5_8",
        "rikka_mino_5_9",
        "rikka_mino_5_10",
        "rikka_mino_5_11",
        "rikka_mino_5_12",
        "rikka_mino_5_13",
        "rikka_mino_5_14",
        "rikka_mino_5_15",
        "rikka_mino_5_16",
        "rikka_mino_5_17",
        "rikka_mino_5_19",
        "rikka_mino_5_25",
        "rikka_mino_5_26",
        "rikka_mino_6_11",
        "rikka_mino_6_12",
        "rikka_mino_6_17",
        "rikka_mino_6_26",
      ],
      common_event_id: 873,
      switch_id: 1073,
      thumbnail: "tn73",
    },
    74: {
      title: "リッカ×ミノタウロスSEX淫",
      pictures: [
        "rikka_mino_1_2",
        "rikka_mino_1_4",
        "rikka_mino_1_5",
        "rikka_mino_1_7",
        "rikka_mino_2_2",
        "rikka_mino_2_4",
        "rikka_mino_2_5",
        "rikka_mino_2_8",
        "rikka_mino_2_18",
        "rikka_mino_2_19",
        "rikka_mino_2_20",
        "rikka_mino_3_2",
        "rikka_mino_3_3",
        "rikka_mino_3_9",
        "rikka_mino_3_13",
        "rikka_mino_3_19",
        "rikka_mino_4_1",
        "rikka_mino_4_6",
        "rikka_mino_4_8",
        "rikka_mino_4_9",
        "rikka_mino_4_11",
        "rikka_mino_4_13",
        "rikka_mino_4_14",
        "rikka_mino_4_15",
        "rikka_mino_4_16",
        "rikka_mino_4_17",
        "rikka_mino_4_18",
        "rikka_mino_4_19",
        "rikka_mino_4_21",
        "rikka_mino_4_22",
        "rikka_mino_4_23",
        "rikka_mino_4_24",
        "rikka_mino_4_25",
        "rikka_mino_4_26",
        "rikka_mino_5_2",
        "rikka_mino_5_5",
        "rikka_mino_5_6",
        "rikka_mino_5_8",
        "rikka_mino_5_9",
        "rikka_mino_5_10",
        "rikka_mino_5_11",
        "rikka_mino_5_12",
        "rikka_mino_5_13",
        "rikka_mino_5_14",
        "rikka_mino_5_15",
        "rikka_mino_5_16",
        "rikka_mino_5_17",
        "rikka_mino_5_19",
        "rikka_mino_5_25",
        "rikka_mino_5_26",
        "rikka_mino_6_11",
        "rikka_mino_6_12",
        "rikka_mino_6_17",
        "rikka_mino_6_26",
      ],
      common_event_id: 874,
      switch_id: 1074,
      thumbnail: "tn74",
    },
    75: {
      title: "リッカ×ミノタウロスSEX恋",
      pictures: [
        "rikka_mino_1_2",
        "rikka_mino_1_4",
        "rikka_mino_1_5",
        "rikka_mino_1_7",
        "rikka_mino_2_2",
        "rikka_mino_2_4",
        "rikka_mino_2_5",
        "rikka_mino_2_8",
        "rikka_mino_2_18",
        "rikka_mino_2_19",
        "rikka_mino_2_20",
        "rikka_mino_3_2",
        "rikka_mino_3_3",
        "rikka_mino_3_9",
        "rikka_mino_3_13",
        "rikka_mino_3_19",
        "rikka_mino_4_1",
        "rikka_mino_4_6",
        "rikka_mino_4_8",
        "rikka_mino_4_9",
        "rikka_mino_4_11",
        "rikka_mino_4_13",
        "rikka_mino_4_14",
        "rikka_mino_4_15",
        "rikka_mino_4_16",
        "rikka_mino_4_17",
        "rikka_mino_4_18",
        "rikka_mino_4_19",
        "rikka_mino_4_21",
        "rikka_mino_4_22",
        "rikka_mino_4_23",
        "rikka_mino_4_24",
        "rikka_mino_4_25",
        "rikka_mino_4_26",
        "rikka_mino_5_2",
        "rikka_mino_5_5",
        "rikka_mino_5_6",
        "rikka_mino_5_8",
        "rikka_mino_5_9",
        "rikka_mino_5_10",
        "rikka_mino_5_11",
        "rikka_mino_5_12",
        "rikka_mino_5_13",
        "rikka_mino_5_14",
        "rikka_mino_5_15",
        "rikka_mino_5_16",
        "rikka_mino_5_17",
        "rikka_mino_5_19",
        "rikka_mino_5_25",
        "rikka_mino_5_26",
        "rikka_mino_6_11",
        "rikka_mino_6_12",
        "rikka_mino_6_17",
        "rikka_mino_6_26",
      ],
      common_event_id: 875,
      switch_id: 1075,
      thumbnail: "tn75",
    },
    76: {
      title: "シーナ×ミノタウロスSEX",
      pictures: [
        "sina_mino_1_2",
        "sina_mino_1_8",
        "sina_mino_1_10",
        "sina_mino_1_16",
        "sina_mino_2_5",
        "sina_mino_2_6",
        "sina_mino_2_8",
        "sina_mino_2_9",
        "sina_mino_2_10",
        "sina_mino_2_17",
        "sina_mino_2_18",
        "sina_mino_3_2",
        "sina_mino_3_11",
        "sina_mino_3_17",
        "sina_mino_3_19",
        "sina_mino_3_20",
        "sina_mino_4_8",
        "sina_mino_4_9",
        "sina_mino_4_10",
        "sina_mino_4_11",
        "sina_mino_4_12",
        "sina_mino_4_14",
        "sina_mino_4_15",
        "sina_mino_4_16",
        "sina_mino_4_17",
        "sina_mino_4_18",
        "sina_mino_4_19",
        "sina_mino_4_20",
        "sina_mino_4_21",
        "sina_mino_4_22",
        "sina_mino_4_23",
        "sina_mino_4_24",
        "sina_mino_4_25",
        "sina_mino_5_20",
        "sina_mino_5_21",
        "sina_mino_5_22",
        "sina_mino_5_23",
        "sina_mino_5_25",
      ],
      common_event_id: 876,
      switch_id: 1076,
      thumbnail: "tn76",
    },
    77: {
      title: "シーナ×ミノタウロスSEX淫",
      pictures: [
        "sina_mino_1_2",
        "sina_mino_1_8",
        "sina_mino_1_10",
        "sina_mino_1_16",
        "sina_mino_2_5",
        "sina_mino_2_6",
        "sina_mino_2_8",
        "sina_mino_2_9",
        "sina_mino_2_10",
        "sina_mino_2_17",
        "sina_mino_2_18",
        "sina_mino_3_2",
        "sina_mino_3_11",
        "sina_mino_3_17",
        "sina_mino_3_19",
        "sina_mino_3_20",
        "sina_mino_4_8",
        "sina_mino_4_9",
        "sina_mino_4_10",
        "sina_mino_4_11",
        "sina_mino_4_12",
        "sina_mino_4_14",
        "sina_mino_4_15",
        "sina_mino_4_16",
        "sina_mino_4_17",
        "sina_mino_4_18",
        "sina_mino_4_19",
        "sina_mino_4_20",
        "sina_mino_4_21",
        "sina_mino_4_22",
        "sina_mino_4_23",
        "sina_mino_4_24",
        "sina_mino_4_25",
        "sina_mino_5_20",
        "sina_mino_5_21",
        "sina_mino_5_22",
        "sina_mino_5_23",
        "sina_mino_5_25",
      ],
      common_event_id: 877,
      switch_id: 1077,
      thumbnail: "tn77",
    },
    78: {
      title: "シーナ×ミノタウロスSEX恋",
      pictures: [
        "sina_mino_1_2",
        "sina_mino_1_8",
        "sina_mino_1_10",
        "sina_mino_1_16",
        "sina_mino_2_5",
        "sina_mino_2_6",
        "sina_mino_2_8",
        "sina_mino_2_9",
        "sina_mino_2_10",
        "sina_mino_2_17",
        "sina_mino_2_18",
        "sina_mino_3_2",
        "sina_mino_3_11",
        "sina_mino_3_17",
        "sina_mino_3_19",
        "sina_mino_3_20",
        "sina_mino_4_8",
        "sina_mino_4_9",
        "sina_mino_4_10",
        "sina_mino_4_11",
        "sina_mino_4_12",
        "sina_mino_4_14",
        "sina_mino_4_15",
        "sina_mino_4_16",
        "sina_mino_4_17",
        "sina_mino_4_18",
        "sina_mino_4_19",
        "sina_mino_4_20",
        "sina_mino_4_21",
        "sina_mino_4_22",
        "sina_mino_4_23",
        "sina_mino_4_24",
        "sina_mino_4_25",
        "sina_mino_5_20",
        "sina_mino_5_21",
        "sina_mino_5_22",
        "sina_mino_5_23",
        "sina_mino_5_25",
      ],
      common_event_id: 878,
      switch_id: 1078,
      thumbnail: "tn78",
    },
    79: {
      title: "ヘレナ×ミノタウロスSEX",
      pictures: [
        "herena_mino_1_1",
        "herena_mino_1_2",
        "herena_mino_1_6",
        "herena_mino_1_10",
        "herena_mino_1_14",
        "herena_mino_2_1",
        "herena_mino_2_5",
        "herena_mino_2_6",
        "herena_mino_2_8",
        "herena_mino_2_9",
        "herena_mino_2_10",
        "herena_mino_2_11",
        "herena_mino_2_13",
        "herena_mino_2_15",
        "herena_mino_3_6",
        "herena_mino_3_8",
        "herena_mino_3_11",
        "herena_mino_3_21",
        "herena_mino_4_5",
        "herena_mino_4_6",
        "herena_mino_4_9",
        "herena_mino_4_10",
        "herena_mino_4_11",
        "herena_mino_4_13",
        "herena_mino_4_14",
        "herena_mino_4_16",
        "herena_mino_4_17",
        "herena_mino_4_18",
        "herena_mino_4_19",
        "herena_mino_4_20",
        "herena_mino_4_21",
        "herena_mino_4_22",
        "herena_mino_4_23",
        "herena_mino_4_25",
        "herena_mino_5_17",
        "herena_mino_5_20",
        "herena_mino_5_21",
        "herena_mino_5_23",
        "herena_mino_5_24",
      ],
      common_event_id: 879,
      switch_id: 1079,
      thumbnail: "tn79",
    },
    80: {
      title: "ヘレナ×ミノタウロスSEX淫",
      pictures: [
        "herena_mino_1_1",
        "herena_mino_1_2",
        "herena_mino_1_6",
        "herena_mino_1_10",
        "herena_mino_1_14",
        "herena_mino_2_1",
        "herena_mino_2_5",
        "herena_mino_2_6",
        "herena_mino_2_8",
        "herena_mino_2_9",
        "herena_mino_2_10",
        "herena_mino_2_11",
        "herena_mino_2_13",
        "herena_mino_2_15",
        "herena_mino_3_6",
        "herena_mino_3_8",
        "herena_mino_3_11",
        "herena_mino_3_21",
        "herena_mino_4_5",
        "herena_mino_4_6",
        "herena_mino_4_9",
        "herena_mino_4_10",
        "herena_mino_4_11",
        "herena_mino_4_13",
        "herena_mino_4_14",
        "herena_mino_4_16",
        "herena_mino_4_17",
        "herena_mino_4_18",
        "herena_mino_4_19",
        "herena_mino_4_20",
        "herena_mino_4_21",
        "herena_mino_4_22",
        "herena_mino_4_23",
        "herena_mino_4_25",
        "herena_mino_5_17",
        "herena_mino_5_20",
        "herena_mino_5_21",
        "herena_mino_5_23",
        "herena_mino_5_24",
      ],
      common_event_id: 880,
      switch_id: 1080,
      thumbnail: "tn80",
    },
    81: {
      title: "ヘレナ×ミノタウロスSEX恋",
      pictures: [
        "herena_mino_1_1",
        "herena_mino_1_2",
        "herena_mino_1_6",
        "herena_mino_1_10",
        "herena_mino_1_14",
        "herena_mino_2_1",
        "herena_mino_2_5",
        "herena_mino_2_6",
        "herena_mino_2_8",
        "herena_mino_2_9",
        "herena_mino_2_10",
        "herena_mino_2_11",
        "herena_mino_2_13",
        "herena_mino_2_15",
        "herena_mino_3_6",
        "herena_mino_3_8",
        "herena_mino_3_11",
        "herena_mino_3_21",
        "herena_mino_4_5",
        "herena_mino_4_6",
        "herena_mino_4_9",
        "herena_mino_4_10",
        "herena_mino_4_11",
        "herena_mino_4_13",
        "herena_mino_4_14",
        "herena_mino_4_16",
        "herena_mino_4_17",
        "herena_mino_4_18",
        "herena_mino_4_19",
        "herena_mino_4_20",
        "herena_mino_4_21",
        "herena_mino_4_22",
        "herena_mino_4_23",
        "herena_mino_4_25",
        "herena_mino_5_17",
        "herena_mino_5_20",
        "herena_mino_5_21",
        "herena_mino_5_23",
        "herena_mino_5_24",
      ],
      common_event_id: 881,
      switch_id: 1081,
      thumbnail: "tn81",
    },
    82: {
      title: "ミコ×ミノタウロスSEX",
      pictures: [
        "miko_mino_1_2",
        "miko_mino_1_4",
        "miko_mino_1_5",
        "miko_mino_1_7",
        "miko_mino_1_17",
        "miko_mino_2_4",
        "miko_mino_2_7",
        "miko_mino_2_8",
        "miko_mino_2_9",
        "miko_mino_2_14",
        "miko_mino_2_17",
        "miko_mino_2_18",
        "miko_mino_3_1_11",
        "miko_mino_3_1_12",
        "miko_mino_3_1_13",
        "miko_mino_3_1_22",
        "miko_mino_3_1_23",
        "miko_mino_3_2_13",
        "miko_mino_3_2_17",
        "miko_mino_3_2_25",
        "miko_mino_3_2_31",
        "miko_mino_4_1_5",
        "miko_mino_4_1_6",
        "miko_mino_4_1_11",
        "miko_mino_4_1_12",
        "miko_mino_4_1_13",
        "miko_mino_4_1_14",
        "miko_mino_4_1_17",
        "miko_mino_4_1_18",
        "miko_mino_4_1_19",
        "miko_mino_4_1_20",
        "miko_mino_4_1_21",
        "miko_mino_4_1_23",
        "miko_mino_4_1_27",
        "miko_mino_4_1_29",
        "miko_mino_4_1_30",
        "miko_mino_4_1_31",
        "miko_mino_4_2_6",
        "miko_mino_4_2_10",
        "miko_mino_4_2_11",
        "miko_mino_4_2_12",
        "miko_mino_4_2_13",
        "miko_mino_4_2_14",
        "miko_mino_4_2_16",
        "miko_mino_4_2_17",
        "miko_mino_4_2_20",
        "miko_mino_4_2_21",
        "miko_mino_4_2_22",
        "miko_mino_4_2_23",
        "miko_mino_4_2_25",
        "miko_mino_4_2_26",
        "miko_mino_4_2_27",
        "miko_mino_4_2_29",
        "miko_mino_4_2_30",
        "miko_mino_4_2_31",
        "miko_mino_5_11",
        "miko_mino_5_12",
        "miko_mino_5_13",
        "miko_mino_5_23",
        "miko_mino_5_25",
        "miko_mino_5_27",
        "miko_mino_5_30",
        "miko_mino_5_31",
      ],
      common_event_id: 882,
      switch_id: 1082,
      thumbnail: "tn82",
    },
    83: {
      title: "ミコ×ミノタウロスSEX淫",
      pictures: [
        "miko_mino_1_2",
        "miko_mino_1_4",
        "miko_mino_1_5",
        "miko_mino_1_7",
        "miko_mino_1_17",
        "miko_mino_2_4",
        "miko_mino_2_7",
        "miko_mino_2_8",
        "miko_mino_2_9",
        "miko_mino_2_14",
        "miko_mino_2_17",
        "miko_mino_2_18",
        "miko_mino_3_1_11",
        "miko_mino_3_1_12",
        "miko_mino_3_1_13",
        "miko_mino_3_1_22",
        "miko_mino_3_1_23",
        "miko_mino_3_2_13",
        "miko_mino_3_2_17",
        "miko_mino_3_2_25",
        "miko_mino_3_2_31",
        "miko_mino_4_1_5",
        "miko_mino_4_1_6",
        "miko_mino_4_1_11",
        "miko_mino_4_1_12",
        "miko_mino_4_1_13",
        "miko_mino_4_1_14",
        "miko_mino_4_1_17",
        "miko_mino_4_1_18",
        "miko_mino_4_1_19",
        "miko_mino_4_1_20",
        "miko_mino_4_1_21",
        "miko_mino_4_1_23",
        "miko_mino_4_1_27",
        "miko_mino_4_1_29",
        "miko_mino_4_1_30",
        "miko_mino_4_1_31",
        "miko_mino_4_2_6",
        "miko_mino_4_2_10",
        "miko_mino_4_2_11",
        "miko_mino_4_2_12",
        "miko_mino_4_2_13",
        "miko_mino_4_2_14",
        "miko_mino_4_2_16",
        "miko_mino_4_2_17",
        "miko_mino_4_2_20",
        "miko_mino_4_2_21",
        "miko_mino_4_2_22",
        "miko_mino_4_2_23",
        "miko_mino_4_2_25",
        "miko_mino_4_2_26",
        "miko_mino_4_2_27",
        "miko_mino_4_2_29",
        "miko_mino_4_2_30",
        "miko_mino_4_2_31",
        "miko_mino_5_11",
        "miko_mino_5_12",
        "miko_mino_5_13",
        "miko_mino_5_23",
        "miko_mino_5_25",
        "miko_mino_5_27",
        "miko_mino_5_30",
        "miko_mino_5_31",
      ],
      common_event_id: 883,
      switch_id: 1083,
      thumbnail: "tn83",
    },
    84: {
      title: "ミコ×ミノタウロスSEX恋",
      pictures: [
        "miko_mino_1_2",
        "miko_mino_1_4",
        "miko_mino_1_5",
        "miko_mino_1_7",
        "miko_mino_1_17",
        "miko_mino_2_4",
        "miko_mino_2_7",
        "miko_mino_2_8",
        "miko_mino_2_9",
        "miko_mino_2_14",
        "miko_mino_2_17",
        "miko_mino_2_18",
        "miko_mino_3_1_11",
        "miko_mino_3_1_12",
        "miko_mino_3_1_13",
        "miko_mino_3_1_22",
        "miko_mino_3_1_23",
        "miko_mino_3_2_13",
        "miko_mino_3_2_17",
        "miko_mino_3_2_25",
        "miko_mino_3_2_31",
        "miko_mino_4_1_5",
        "miko_mino_4_1_6",
        "miko_mino_4_1_11",
        "miko_mino_4_1_12",
        "miko_mino_4_1_13",
        "miko_mino_4_1_14",
        "miko_mino_4_1_17",
        "miko_mino_4_1_18",
        "miko_mino_4_1_19",
        "miko_mino_4_1_20",
        "miko_mino_4_1_21",
        "miko_mino_4_1_23",
        "miko_mino_4_1_27",
        "miko_mino_4_1_29",
        "miko_mino_4_1_30",
        "miko_mino_4_1_31",
        "miko_mino_4_2_6",
        "miko_mino_4_2_10",
        "miko_mino_4_2_11",
        "miko_mino_4_2_12",
        "miko_mino_4_2_13",
        "miko_mino_4_2_14",
        "miko_mino_4_2_16",
        "miko_mino_4_2_17",
        "miko_mino_4_2_20",
        "miko_mino_4_2_21",
        "miko_mino_4_2_22",
        "miko_mino_4_2_23",
        "miko_mino_4_2_25",
        "miko_mino_4_2_26",
        "miko_mino_4_2_27",
        "miko_mino_4_2_29",
        "miko_mino_4_2_30",
        "miko_mino_4_2_31",
        "miko_mino_5_11",
        "miko_mino_5_12",
        "miko_mino_5_13",
        "miko_mino_5_23",
        "miko_mino_5_25",
        "miko_mino_5_27",
        "miko_mino_5_30",
        "miko_mino_5_31",
      ],
      common_event_id: 884,
      switch_id: 1084,
      thumbnail: "tn84",
    },
    85: {
      title: "リッカ催淫解除",
      pictures: [
        "rikkaSaiinnOFF1",
        "rikkaSaiinnOFF2",
        "rikkaSaiinnOFF3",
        "rikkaSaiinnOFF4",
        "rikkaSaiinnOFF5",
        "rikkaSaiinnOFF6",
        "rikkaSaiinnOFF7",
        "rikkaSaiinnOFF8",
      ],
      common_event_id: 885,
      switch_id: 1085,
      thumbnail: "tn85",
    },
    86: {
      title: "リッカオナニー",
      pictures: [
        "rikkaOna11",
        "rikkaOna12",
        "rikkaOna13",
        "rikkaOna21",
        "rikkaOna22",
        "rikkaOna23",
        "rikkaOna31",
        "rikkaOna32",
        "rikkaOna41",
      ],
      common_event_id: 886,
      switch_id: 1086,
      thumbnail: "tn86",
    },
    87: {
      title: "リッカ出産",
      pictures: [
        "rikka_egg1",
        "rikka_egg2",
        "rikka_egg3",
        "rikka_egg4",
        "rikka_egg5",
      ],
      common_event_id: 887,
      switch_id: 1087,
      thumbnail: "tn87",
    },
    88: {
      title: "リッカ×主人公",
      pictures: [
        "rikka_syujinkou_1_3",
        "rikka_syujinkou_1_7",
        "rikka_syujinkou_1_8",
        "rikka_syujinkou_1_9",
        "rikka_syujinkou_1_10",
        "rikka_syujinkou_1_14",
        "rikka_syujinkou_1_16",
        "rikka_syujinkou_2_2",
        "rikka_syujinkou_2_5",
        "rikka_syujinkou_2_6",
        "rikka_syujinkou_2_7",
        "rikka_syujinkou_2_8",
        "rikka_syujinkou_2_9",
        "rikka_syujinkou_2_14",
        "rikka_syujinkou_2_15",
        "rikka_syujinkou_2_16",
        "rikka_syujinkou_2_17",
        "rikka_syujinkou_2_19",
        "rikka_syujinkou_2_20",
        "rikka_syujinkou_2_21",
        "rikka_syujinkou_2_22",
        "rikka_syujinkou_2_24",
        "rikka_syujinkou_2_26",
        "rikka_syujinkou_3_5",
        "rikka_syujinkou_3_13",
        "rikka_syujinkou_3_14",
        "rikka_syujinkou_3_15",
        "rikka_syujinkou_3_17",
        "rikka_syujinkou_3_18",
        "rikka_syujinkou_3_19",
        "rikka_syujinkou_3_20",
        "rikka_syujinkou_3_22",
        "rikka_syujinkou_3_23",
        "rikka_syujinkou_3_24",
        "rikka_syujinkou_3_25",
        "rikka_syujinkou_3_26",
        "rikka_syujinkou_3_27",
        "rikka_syujinkou_3_28",
        "rikka_syujinkou_4_19",
        "rikka_syujinkou_4_26",
        "rikka_syujinkou_4_28",
      ],
      common_event_id: 888,
      switch_id: 1088,
      thumbnail: "tn88",
    },
    89: {
      title: "リッカNTR",
      pictures: [
        "rikka_shoninn_1_1",
        "rikka_shoninn_1_2",
        "rikka_shoninn_1_5",
        "rikka_shoninn_1_13",
        "rikka_shoninn_1_14",
        "rikka_shoninn_2_1",
        "rikka_shoninn_2_2",
        "rikka_shoninn_2_4",
        "rikka_shoninn_2_6",
        "rikka_shoninn_2_7",
        "rikka_shoninn_2_8",
        "rikka_shoninn_2_9",
        "rikka_shoninn_2_10",
        "rikka_shoninn_2_11",
        "rikka_shoninn_2_12",
        "rikka_shoninn_2_13",
        "rikka_shoninn_2_14",
        "rikka_shoninn_2_15",
        "rikka_shoninn_2_16",
        "rikka_shoninn_2_18",
        "rikka_shoninn_2_19",
        "rikka_shoninn_3_11",
        "rikka_shoninn_3_19",
        "rikka_shoninn_3_20",
      ],
      common_event_id: 889,
      switch_id: 1089,
      thumbnail: "tn89",
    },
    90: {
      title: "シーナ催淫解除",
      pictures: ["sinaSaiinn", "sinaSaiinn2"],
      common_event_id: 890,
      switch_id: 1090,
      thumbnail: "tn90",
    },
    91: {
      title: "シーナオナニー",
      pictures: [
        "sinaOna11",
        "sinaOna12",
        "sinaOna13",
        "sinaOna14",
        "sinaOna15",
        "sinaOna21",
        "sinaOna22",
        "sinaOna23",
        "sinaOna24",
        "sinaOna25",
      ],
      common_event_id: 891,
      switch_id: 1091,
      thumbnail: "tn91",
    },
    92: {
      title: "シーナ出産",
      pictures: [
        "sina_egg1",
        "sina_egg2",
        "sina_egg3",
        "sina_egg4",
        "sina_egg5",
        "sina_egg6",
        "sina_egg7",
        "sina_egg8",
      ],
      common_event_id: 892,
      switch_id: 1092,
      thumbnail: "tn92",
    },
    93: {
      title: "シーナ×主人公",
      pictures: [
        "sinaSyujinkou1",
        "sinaSyujinkou2",
        "sinaSyujinkou3",
        "sinaSyujinkou4",
        "sinaSyujinkou5",
        "sinaSyujinkou6",
        "sinaSyujinkou7",
        "sinaSyujinkou8",
        "sinaSyujinkou9",
        "sinaSyujinkou10",
        "sinaSyujinkou11",
        "sinaSyujinkou12",
        "sinaSyujinkou13",
        "sinaSyujinkou14",
        "sinaSyujinkou15",
        "sinaSyujinkou16",
        "sinaSyujinkou17",
        "sinaSyujinkou18",
        "sinaSyujinkou19",
        "sinaSyujinkou20",
        "sinaSyujinkou21",
        "sinaSyujinkou22",
        "sinaSyujinkou23",
        "sinaSyujinkou24",
        "sinaSyujinkou25",
        "sinaSyujinkou26",
        "sinaSyujinkour7",
        "sinaSyujinkour8",
        "sinaSyujinkour13",
        "sinaSyujinkour15",
        "sinaSyujinkour19",
        "sinaSyujinkouw1",
        "sinaSyujinkouw3",
        "sinaSyujinkouw4",
        "sinaSyujinkouw6",
        "sinaSyujinkouw7",
        "sinaSyujinkouw9",
        "sinaSyujinkouw11",
        "sinaSyujinkouw13",
        "sinaSyujinkouw14",
        "sinaSyujinkouw16",
        "sinaSyujinkouw17",
        "sinaSyujinkouw19",
        "sinaSyujinkouw20",
        "sinaSyujinkouw21",
        "sinaSyujinkouw22",
        "sinaSyujinkoua1",
        "sinaSyujinkoua2",
        "sinaSyujinkoua3",
        "sinaSyujinkoua4",
        "sinaSyujinkoua5",
        "sinaSyujinkoua6",
        "sinaSyujinkoua7",
        "sinaSyujinkoua8",
        "sinaSyujinkoua9",
        "sinaSyujinkoua10",
        "sinaSyujinkoua11",
        "sinaSyujinkoua12",
        "sinaSyujinkoua13",
        "sinaSyujinkoua14",
        "sinaSyujinkoua15",
        "sinaSyujinkoua16",
        "sinaSyujinkoua17",
        "sinaSyujinkoua18",
        "sinaSyujinkoua19",
        "sinaSyujinkoua20",
        "sinaSyujinkoua21",
        "sinaSyujinkoua22",
        "sinaSyujinkoua23",
        "sinaSyujinkoua24",
        "sinaSyujinkoua25",
        "sinaSyujinkoua26",
        "sinaSyujinkouq1",
        "sinaSyujinkouq2",
        "sinaSyujinkouq3",
        "sinaSyujinkouq4",
        "sinaSyujinkouq5",
        "sinaSyujinkouq6",
        "sinaSyujinkouq7",
        "sinaSyujinkouq8",
        "sinaSyujinkouq9",
        "sinaSyujinkouq10",
        "sinaSyujinkouq11",
        "sinaSyujinkouq12",
        "sinaSyujinkouq13",
        "sinaSyujinkouq14",
        "sinaSyujinkouq15",
        "sinaSyujinkouq16",
        "sinaSyujinkouq17",
        "sinaSyujinkouq18",
        "sinaSyujinkouq19",
        "sinaSyujinkouq20",
        "sinaSyujinkouq21",
        "sinaSyujinkouq22",
        "sinaSyujinkouq23",
        "sinaSyujinkouq24",
        "sinaSyujinkouq25",
        "sinaSyujinkouq26",
      ],
      common_event_id: 893,
      switch_id: 1093,
      thumbnail: "tn93",
    },
    94: {
      title: "シーナNTR",
      pictures: [
        "sina_papa_1_1",
        "sina_papa_1_3",
        "sina_papa_1_5",
        "sina_papa_1_7",
        "sina_papa_1_13",
        "sina_papa_1_14",
        "sina_papa_1_15",
        "sina_papa_1_17",
        "sina_papa_1_21",
        "sina_papa_1_22",
        "sina_papa_2_11",
        "sina_papa_2_15",
        "sina_papa_2_16",
        "sina_papa_2_17",
        "sina_papa_2_18",
        "sina_papa_2_19",
        "sina_papa_2_20",
        "sina_papa_2_21",
        "sina_papa_2_22",
        "sina_papa_2_23",
        "sina_papa_3_19",
        "sina_papa_3_23",
        "sina_papa_4_16",
        "sina_papa_4_19",
        "sina_papa_4_20",
        "sina_papa_4_23",
      ],
      common_event_id: 894,
      switch_id: 1094,
      thumbnail: "tn94",
    },
    95: {
      title: "ヘレナ催淫解除",
      pictures: ["herenaSaiinn", "herenaSaiinn2"],
      common_event_id: 895,
      switch_id: 1095,
      thumbnail: "tn95",
    },
    96: {
      title: "ヘレナオナニー",
      pictures: [
        "herenaOna11",
        "herenaOna12",
        "herenaOna13",
        "herenaOna21",
        "herenaOna22",
        "herenaOna23",
      ],
      common_event_id: 896,
      switch_id: 1096,
      thumbnail: "tn96",
    },
    97: {
      title: "ヘレナ出産",
      pictures: [
        "herenaegg1",
        "herenaegg2",
        "herenaegg3",
        "herenaegg4",
        "herenaegg5",
        "herenaegg6",
        "herenaegg7",
        "herenaegg8",
        "herenaegg9",
        "herenaegg10",
        "herenaegg11",
        "herenaegg12",
        "herenaegg13",
        "herenaegg14",
        "herenaegg15",
        "herenaegg16",
        "herenaegg17",
      ],
      common_event_id: 897,
      switch_id: 1097,
      thumbnail: "tn97",
    },
    98: {
      title: "ヘレナ×主人公",
      pictures: [
        "herena_syujinkou_1_4",
        "herena_syujinkou_1_6",
        "herena_syujinkou_1_18",
        "herena_syujinkou_1_20",
        "herena_syujinkou_1_21",
        "herena_syujinkou_1_25",
        "herena_syujinkou_1_29",
        "herena_syujinkou_1_30",
        "herena_syujinkou_1_33",
        "herena_syujinkou_1_35",
        "herena_syujinkou_2_6",
        "herena_syujinkou_2_7",
        "herena_syujinkou_2_8",
        "herena_syujinkou_2_10",
        "herena_syujinkou_2_12",
        "herena_syujinkou_2_14",
        "herena_syujinkou_2_18",
        "herena_syujinkou_2_19",
        "herena_syujinkou_2_21",
        "herena_syujinkou_2_22",
        "herena_syujinkou_2_23",
        "herena_syujinkou_2_25",
        "herena_syujinkou_2_26",
        "herena_syujinkou_2_29",
        "herena_syujinkou_3_7",
        "herena_syujinkou_3_18",
        "herena_syujinkou_4_7",
        "herena_syujinkou_4_8",
        "herena_syujinkou_4_9",
        "herena_syujinkou_4_10",
        "herena_syujinkou_4_11",
        "herena_syujinkou_4_12",
        "herena_syujinkou_4_13",
        "herena_syujinkou_4_19",
        "herena_syujinkou_4_21",
        "herena_syujinkou_4_24",
        "herena_syujinkou_4_25",
        "herena_syujinkou_4_26",
        "herena_syujinkou_4_29",
        "herena_syujinkou_5_9",
        "herena_syujinkou_5_10",
        "herena_syujinkou_5_11",
        "herena_syujinkou_5_12",
        "herena_syujinkou_5_13",
        "herena_syujinkou_5_19",
        "herena_syujinkou_5_26",
        "herena_syujinkou_5_31",
      ],
      common_event_id: 898,
      switch_id: 1098,
      thumbnail: "tn98",
    },
    99: {
      title: "ヘレナNTR",
      pictures: [
        "herenaShonen_a1",
        "herenaShonen_a2",
        "herenaShonen_a3",
        "herenaShonen_a4",
        "herenaShonen_b1",
        "herenaShonen_b2",
        "herenaShonen_b3",
        "herenaShonen_b5",
        "herenaShonen_b6",
        "herenaShonen_b7",
        "herenaShonen_b10",
        "herenaShonen_c1",
        "herenaShonen_c2",
        "herenaShonen_c6",
        "herenaShonen_c6_",
        "herenaShonen_c8",
        "herenaShonen_d8",
        "herenaShonen_d9",
        "herenaShonen_d10",
        "herenaShonen_d11",
        "herenaShonen_d12",
        "herenaShonen_d13",
        "herenaShonen_d14",
        "herenaShonen_d15",
        "herenaShonen_d16",
        "herenaShonen_e11",
      ],
      common_event_id: 899,
      switch_id: 1099,
      thumbnail: "tn99",
    },
    100: {
      title: "ミコ催淫解除",
      pictures: [
        "mikoSaiinnOFF1",
        "mikoSaiinnOFF2",
        "mikoSaiinnOFF3",
        "mikoSaiinnOFF4",
        "mikoSaiinnOFF5",
        "mikoSaiinnOFF6",
        "mikoSaiinnOFF7",
      ],
      common_event_id: 900,
      switch_id: 1100,
      thumbnail: "tn100",
    },
    101: {
      title: "ミコオナニー",
      pictures: ["mikoOna1", "mikoOna2", "mikoOna3"],
      common_event_id: 901,
      switch_id: 1101,
      thumbnail: "tn101",
    },
    102: {
      title: "ミコ出産",
      pictures: [
        "mikoSanran11",
        "mikoSanran12",
        "mikoSanran13",
        "mikoSanran14",
        "mikoSanran15",
        "mikoSanran16",
        "mikoSanran21",
        "mikoSanran22",
        "mikoSanran31",
        "mikoSanran32",
      ],
      common_event_id: 902,
      switch_id: 1102,
      thumbnail: "tn102",
    },
    103: {
      title: "ミコ×主人公",
      pictures: [
        "mikoSyujinkou_1",
        "mikoSyujinkou_2",
        "mikoSyujinkou_3",
        "mikoSyujinkou_4",
        "mikoSyujinkou_5",
        "mikoSyujinkou_6",
        "mikoSyujinkou_7",
        "mikoSyujinkou_8",
        "mikoSyujinkou_9",
        "mikoSyujinkou_10",
        "mikoSyujinkou_11",
        "mikoSyujinkou_12",
        "mikoSyujinkou_13",
        "mikoSyujinkou_14",
        "mikoSyujinkou_15",
        "mikoSyujinkou_16",
        "mikoSyujinkou_17",
        "mikoSyujinkou_18",
        "mikoSyujinkou_19",
        "mikoSyujinkou_20",
        "mikoSyujinkou_21",
        "mikoSyujinkou_22",
        "mikoSyujinkou_23",
        "mikoSyujinkou_24",
        "mikoSyujinkou_25",
        "mikoSyujinkou_26",
        "mikoSyujinkou_27",
        "mikoSyujinkou_28",
        "mikoSyujinkou_29",
        "mikoSyujinkou_30",
        "mikoSyujinkou_31",
        "mikoSyujinkou_32",
        "mikoSyujinkou_33",
        "mikoSyujinkou_34",
        "mikoSyujinkou_35",
        "mikoSyujinkou_36",
        "mikoSyujinkou_37",
        "mikoSyujinkou_38",
        "mikoSyujinkou_39",
        "mikoSyujinkou_40",
        "mikoSyujinkou_41",
        "mikoSyujinkou_42",
        "mikoSyujinkou_43",
        "mikoSyujinkou_44",
        "mikoSyujinkou_45",
        "mikoSyujinkou_46",
        "mikoSyujinkou_47",
        "mikoSyujinkou_48",
        "mikoSyujinkou_49",
        "mikoSyujinkou_50",
        "mikoSyujinkou_51",
        "mikoSyujinkou_52",
        "mikoSyujinkou_53",
        "mikoSyujinkou_54",
        "mikoSyujinkou_55",
        "mikoSyujinkou_56",
        "mikoSyujinkou_412",
        "mikoSyujinkou_422",
        "mikoSyujinkou_432",
        "mikoSyujinkou_442",
        "mikoSyujinkou_452",
        "mikoSyujinkou_462",
        "mikoSyujinkou_472",
        "mikoSyujinkou_482",
      ],
      common_event_id: 903,
      switch_id: 1103,
      thumbnail: "tn103",
    },
    104: {
      title: "ミコNTR",
      pictures: [
        "miko_sontyo_1_2",
        "miko_sontyo_1_4",
        "miko_sontyo_1_5",
        "miko_sontyo_1_6",
        "miko_sontyo_1_7",
        "miko_sontyo_1_8",
        "miko_sontyo_1_9",
        "miko_sontyo_1_10",
        "miko_sontyo_1_12",
        "miko_sontyo_1_21",
        "miko_sontyo_1_22",
        "miko_sontyo_1_30",
        "miko_sontyo_2_20",
        "miko_sontyo_2_21",
        "miko_sontyo_2_22",
        "miko_sontyo_2_24",
        "miko_sontyo_2_25",
        "miko_sontyo_2_26",
        "miko_sontyo_3_10",
        "miko_sontyo_3_11",
        "miko_sontyo_3_15",
        "miko_sontyo_3_16",
        "miko_sontyo_3_21",
        "miko_sontyo_3_23",
        "miko_sontyo_3_24",
        "miko_sontyo_3_25",
        "miko_sontyo_3_26",
        "miko_sontyo_3_27",
        "miko_sontyo_3_28",
        "miko_sontyo_4_11",
        "miko_sontyo_4_25",
        "miko_sontyo_4_27",
        "miko_sontyo_4_28",
        "miko_sontyo_5_28",
        "miko_sontyo_5_29",
        "miko_sontyo_5_32",
      ],
      common_event_id: 904,
      switch_id: 1104,
      thumbnail: "tn104",
    },
    105: {
      title: "村の少女と、、1",
      pictures: ["girlSEX1", "girlSEX2"],
      common_event_id: 905,
      switch_id: 1105,
      thumbnail: "tn105",
    },
    106: {
      title: "村の少女と、、2",
      pictures: ["girl2SEX1", "girl2SEX2"],
      common_event_id: 906,
      switch_id: 1106,
      thumbnail: "tn106",
    },
    107: {
      title: "村の女性と、、1",
      pictures: ["mamas21", "mamas22", "mamas23"],
      common_event_id: 907,
      switch_id: 1107,
      thumbnail: "tn107",
    },
    108: {
      title: "村の女性と、、2",
      pictures: ["mamas11", "mamas12", "mamas13"],
      common_event_id: 908,
      switch_id: 1108,
      thumbnail: "tn108",
    },
    109: {
      title: "リッカママと、、",
      pictures: [
        "kaisoumama1",
        "kaisoumama2",
        "kaisoumama3",
        "kaisoumama4",
        "kaisoumama5",
        "kaisoumama6",
      ],
      common_event_id: 909,
      switch_id: 1109,
      thumbnail: "tn109",
    },
    110: {
      title: "ハーレムエンド",
      pictures: [
        "true_end_01",
        "true_end_02",
        "true_end_03",
        "true_end_04",
        "true_end_05",
        "true_end_06",
        "true_end_07",
        "true_end_08",
        "true_end_09",
        "true_end_10",
        "true_end_11",
        "true_end_12",
        "true_end_13",
        "true_end_14",
        "true_end_15",
        "true_end_16",
        "true_end_17",
        "true_end_18",
        "true_end_19",
        "true_end_20",
        "true_end_21",
        "true_end_22",
        "true_end_23",
        "true_end_24",
        "true_end_25",
        "true_end_26",
        "true_end_27",
        "true_end_28",
        "true_end_29",
        "true_end_30",
        "true_end_31",
        "true_end_32",
        "true_end_33",
        "true_end_34",
        "true_end_35",
        "true_end_36",
        "true_end_37",
        "true_end_38",
        "true_end_39",
        "true_end_40",
        "true_end_41",
        "true_end_42",
        "true_end_43",
      ],
      common_event_id: 910,
      switch_id: 1110,
      thumbnail: "tn110",
    },
  },
  //---------------------------------------------------------------------
  // ★ 回想時に一時的に利用するマップIDを指定します
  //---------------------------------------------------------------------
  // 通常は何もないマップを指定します
  //---------------------------------------------------------------------
  sandbox_map_id: 39,
  //---------------------------------------------------------------------
  // ★ 回想用スイッチをセーブデータ間で共有するかどうかを指定します
  //---------------------------------------------------------------------
  // パラメータの説明
  // true:
  //      回想用スイッチを共有します。
  //
  //      例1：セーブ1で回想スイッチ1, 2, 3がONとする
  //          ニューゲームで開始し、セーブ1を上書きする
  //          →セーブ1の回想スイッチ1, 2, 3はONのままとなる。
  //
  //      例2: セーブ1で回想スイッチ1, 2, 3がONとする
  //          セーブ1をロードし、セーブ2を保存する
  //          セーブ2で回想スイッチ1, 2, 3, 7がONとする
  //          セーブ1, セーブ2それぞれで、回想スイッチ1, 2, 3, 7がONとなる
  //
  // false:
  //      回想用スイッチを共有しません
  //
  // すべてのセーブデータを削除した場合にのみ、スイッチがリセットされます
  //---------------------------------------------------------------------
  share_recollection_switches: true,
};

function rngd_hash_size(obj) {
  var cnt = 0;
  for (var o in obj) {
    cnt++;
  }
  return cnt;
}

//-----------------------------------------------------------------------------
// ◆ Scene関数
//-----------------------------------------------------------------------------

//=========================================================================
// ■ Scene_Recollection
//=========================================================================
// 回想用のシーン関数です
//=========================================================================
function Scene_Recollection() {
  this.initialize.apply(this, arguments);
}

Scene_Recollection.prototype = Object.create(Scene_Base.prototype);
Scene_Recollection.prototype.constructor = Scene_Recollection;

Scene_Recollection.prototype.initialize = function () {
  Scene_Base.prototype.initialize.call(this);
};

Scene_Recollection.prototype.create = function () {
  Scene_Base.prototype.create.call(this);
  this.createWindowLayer();
  this.createCommandWindow();
};

// 回想モードのカーソル
Scene_Recollection.rec_list_index = 0;

// 回想モードの再読み込み判定用 true: コマンドウィンドウを表示せず回想リストを表示 false:コマンドウィンドウを表示
Scene_Recollection.reload_rec_list = false;

Scene_Recollection.prototype.createCommandWindow = function () {
  if (Scene_Recollection.reload_rec_list) {
    // 回想モード選択ウィンドウ
    this._rec_window = new Window_RecollectionCommand();
    this._rec_window.setHandler(
      "select_recollection",
      this.commandShowRecollection.bind(this)
    );
    this._rec_window.setHandler("select_cg", this.commandShowCg.bind(this));
    this._rec_window.setHandler(
      "select_back_title",
      this.commandBackTitle.bind(this)
    );

    // リロードの場合：選択ウィンドウを非表示にする
    this._rec_window.visible = false;
    this._rec_window.deactivate();
    this.addWindow(this._rec_window);

    // 回想リスト
    this._rec_list = new Window_RecList(0, 0, Graphics.width, Graphics.height);

    // リロードの場合：回想リストを表示にする
    this._rec_list.visible = true;
    this._rec_list.setHandler("ok", this.commandDoRecMode.bind(this));
    this._rec_list.setHandler("cancel", this.commandBackSelectMode.bind(this));
    this._mode = "recollection";
    this._rec_list.activate();
    this._rec_list.select(Scene_Recollection.rec_list_index);

    this.addWindow(this._rec_list);

    // CG参照用ダミーコマンド
    this._dummy_window = new Window_Command(0, 0);
    this._dummy_window.deactivate();
    this._dummy_window.visible = false;
    this._dummy_window.setHandler("ok", this.commandDummyOk.bind(this));
    this._dummy_window.setHandler("cancel", this.commandDummyCancel.bind(this));
    this._dummy_window.addCommand("next", "ok");
    this.addWindow(this._dummy_window);

    Scene_Recollection.reload_rec_list = false;
  } else {
    // 回想モード選択ウィンドウ
    this._rec_window = new Window_RecollectionCommand();
    this._rec_window.setHandler(
      "select_recollection",
      this.commandShowRecollection.bind(this)
    );
    this._rec_window.setHandler("select_cg", this.commandShowCg.bind(this));
    this._rec_window.setHandler(
      "select_back_title",
      this.commandBackTitle.bind(this)
    );
    this.addWindow(this._rec_window);

    // 回想リスト
    this._rec_list = new Window_RecList(0, 0, Graphics.width, Graphics.height);
    this._rec_list.visible = false;
    this._rec_list.setHandler("ok", this.commandDoRecMode.bind(this));
    this._rec_list.setHandler("cancel", this.commandBackSelectMode.bind(this));
    this._rec_list.select(Scene_Recollection.rec_list_index);
    this.addWindow(this._rec_list);

    // CG参照用ダミーコマンド
    this._dummy_window = new Window_Command(0, 0);
    this._dummy_window.deactivate();
    this._dummy_window.playOkSound = function () {}; // CGﾓｰﾄﾞの場合、OK音を鳴らさない
    this._dummy_window.visible = false;
    this._dummy_window.setHandler("ok", this.commandDummyOk.bind(this));
    this._dummy_window.setHandler("cancel", this.commandDummyCancel.bind(this));
    this._dummy_window.addCommand("next", "ok");
    this.addWindow(this._dummy_window);
  }
};

//-------------------------------------------------------------------------
// ● 開始処理
//-------------------------------------------------------------------------
Scene_Recollection.prototype.start = function () {
  Scene_Base.prototype.start.call(this);
  this._rec_window.refresh();
  this._rec_list.refresh();
  AudioManager.playBgm(rngd_recollection_mode_settings.rec_mode_bgm.bgm);
  Scene_Recollection._rngd_recollection_doing = false;
};

//-------------------------------------------------------------------------
// ● 更新処理
//-------------------------------------------------------------------------
Scene_Recollection.prototype.update = function () {
  Scene_Base.prototype.update.call(this);
};

//-------------------------------------------------------------------------
// ● 「回想を見る」を選択した際のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandShowRecollection = function () {
  // モードウィンドウの無効化とリストウィンドウの有効化
  this.do_exchange_status_window(this._rec_window, this._rec_list);
  this._mode = "recollection";
};

//-------------------------------------------------------------------------
// ● 「CGを見る」を選択した際のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandShowCg = function () {
  this.do_exchange_status_window(this._rec_window, this._rec_list);
  this._mode = "cg";
};

//-------------------------------------------------------------------------
// ● 「タイトルに戻る」を選択した際のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandBackTitle = function () {
  Scene_Recollection.rec_list_index = 0;
  SceneManager.goto(Scene_Title);
};

//-------------------------------------------------------------------------
// ● 回想orCGモードから「キャンセル」して前の画面に戻った場合のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandBackSelectMode = function () {
  this.do_exchange_status_window(this._rec_list, this._rec_window);
};

//-------------------------------------------------------------------------
// ● 回想orCGモードにおいて、実際の回想orCGを選択した場合のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandDoRecMode = function () {
  var target_index = this._rec_list.index() + 1;
  Scene_Recollection.rec_list_index = target_index - 1;

  if (this._rec_list.is_valid_picture(this._rec_list.index() + 1)) {
    // 回想モードの場合
    if (this._mode == "recollection") {
      Scene_Recollection._rngd_recollection_doing = true;

      DataManager.setupNewGame();
      $gamePlayer.setTransparent(255);
      this.fadeOutAll();
      // TODO: パーティを透明状態にする

      //$dataSystem.optTransparent = false;
      $gameTemp.reserveCommonEvent(
        rngd_recollection_mode_settings.rec_cg_set[target_index][
          "common_event_id"
        ]
      );
      $gamePlayer.reserveTransfer(
        rngd_recollection_mode_settings.sandbox_map_id,
        0,
        0,
        0
      );
      SceneManager.push(Scene_Map);

      // CGモードの場合
    } else if (this._mode == "cg") {
      this._cg_sprites = [];
      this._cg_sprites_index = 0;

      // シーン画像をロードする
      rngd_recollection_mode_settings.rec_cg_set[target_index].pictures.forEach(
        function (name) {
          // CGクリックを可能とする
          var sp = new Sprite_Button();
          sp.setClickHandler(this.commandDummyOk.bind(this));
          sp.processTouch = function () {
            Sprite_Button.prototype.processTouch.call(this);
          };
          sp.bitmap = ImageManager.loadPicture(name);
          // 最初のSprite以外は見えないようにする
          if (this._cg_sprites.length > 0) {
            sp.visible = false;
          }

          // TODO: 画面サイズにあわせて、拡大・縮小すべき
          this._cg_sprites.push(sp);
          this.addChild(sp);
        },
        this
      );

      this.do_exchange_status_window(this._rec_list, this._dummy_window);
      this._dummy_window.visible = false;
    }
  } else {
    this._rec_list.activate();
  }
};

Scene_Recollection.prototype.commandDummyOk = function () {
  if (this._cg_sprites_index < this._cg_sprites.length - 1) {
    this._cg_sprites[this._cg_sprites_index].visible = false;
    this._cg_sprites_index++;
    this._cg_sprites[this._cg_sprites_index].visible = true;
    SoundManager.playOk();

    this._dummy_window.activate();
  } else {
    SoundManager.playOk();
    this.commandDummyCancel();
  }
};

Scene_Recollection.prototype.commandDummyCancel = function () {
  this._cg_sprites.forEach(function (obj) {
    obj.visible = false;
    obj = null;
  });
  this.do_exchange_status_window(this._dummy_window, this._rec_list);
};

// コモンイベントから呼び出す関数
Scene_Recollection.prototype.rngd_exit_scene = function () {
  if (Scene_Recollection._rngd_recollection_doing) {
    // Window_RecListを表示する
    Scene_Recollection.reload_rec_list = true;
    SceneManager.push(Scene_Recollection);
  }
};

//-------------------------------------------------------------------------
// ● ウィンドウの無効化と有効化
//-------------------------------------------------------------------------
// win1: 無効化するウィンドウ
// win2: 有効化するウィンドウ
//-------------------------------------------------------------------------
Scene_Recollection.prototype.do_exchange_status_window = function (win1, win2) {
  win1.deactivate();
  win1.visible = false;
  win2.activate();
  win2.visible = true;
};
//-------------------------------------------------------------------------
// ● セーブ・ロード・ニューゲーム時に必要なスイッチをONにする
//-------------------------------------------------------------------------
Scene_Recollection.setRecollectionSwitches = function () {
  // 各セーブデータを参照し、RecollectionMode用のスイッチを検索する
  // スイッチが一つでもONになっている場合は回想をONにする
  for (var i = 1; i <= DataManager.maxSavefiles(); i++) {
    var data = null;
    try {
      data = StorageManager.loadFromLocalFile(i);
    } catch (e) {
      data = StorageManager.loadFromWebStorage(i);
    }
    if (data) {
      var save_data_obj = JsonEx.parse(data);
      var rec_cg_max = rngd_hash_size(
        rngd_recollection_mode_settings.rec_cg_set
      );

      for (var j = 0; j < rec_cg_max; j++) {
        var cg = rngd_recollection_mode_settings.rec_cg_set[j + 1];
        if (
          save_data_obj["switches"]._data[cg.switch_id] &&
          save_data_obj["switches"]._data[cg.switch_id] == true
        ) {
          $gameSwitches.setValue(cg.switch_id, true);
        }
      }
    }
  }
};

//-----------------------------------------------------------------------------
// ◆ Window関数
//-----------------------------------------------------------------------------

//=========================================================================
// ■ Window_RecollectionCommand
//=========================================================================
// 回想モードかCGモードを選択するウィンドウです
//=========================================================================
function Window_RecollectionCommand() {
  this.initialize.apply(this, arguments);
}

Window_RecollectionCommand.prototype = Object.create(Window_Command.prototype);
Window_RecollectionCommand.prototype.constructor = Window_RecollectionCommand;

Window_RecollectionCommand.prototype.initialize = function () {
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.x = rngd_recollection_mode_settings.rec_mode_window.x;
  this.y = rngd_recollection_mode_settings.rec_mode_window.y;
};

Window_RecollectionCommand.prototype.makeCommandList = function () {
  Window_Command.prototype.makeCommandList.call(this);
  this.addCommand(
    rngd_recollection_mode_settings.rec_mode_window.str_select_recollection,
    "select_recollection"
  );
  this.addCommand(
    rngd_recollection_mode_settings.rec_mode_window.str_select_cg,
    "select_cg"
  );
  this.addCommand(
    rngd_recollection_mode_settings.rec_mode_window.str_select_back_title,
    "select_back_title"
  );
};

//=========================================================================
// ■ Window_RecollectionList
//=========================================================================
// 回想またはCGを選択するウィンドウです
//=========================================================================
function Window_RecList() {
  this.initialize.apply(this, arguments);
}

Window_RecList.prototype = Object.create(Window_Selectable.prototype);
Window_RecList.prototype.constructor = Window_RecList;

//-------------------------------------------------------------------------
// ● 初期化処理
//-------------------------------------------------------------------------
Window_RecList.prototype.initialize = function (x, y, width, height) {
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this.windowWidth = width;
  this.windowHeight = height;
  this.select(0);
  this._formationMode = false;
  this.get_global_variables();
  this.refresh();
};

Window_RecList.prototype.maxItems = function () {
  return rngd_hash_size(rngd_recollection_mode_settings.rec_cg_set);
};

Window_RecList.prototype.itemHeight = function () {
  return (
    (this.height - this.standardPadding()) /
    rngd_recollection_mode_settings.rec_list_window.item_height
  );
};

Window_RecList.prototype.maxPageItems = function () {
  return rngd_hash_size(rngd_recollection_mode_settings.rec_cg_set);
};

Window_RecList.prototype.maxCols = function () {
  return rngd_recollection_mode_settings.rec_list_window.item_width;
};

Window_RecList.prototype.maxPageRows = function () {
  var pageHeight = this.height; // - this.padding * 2;
  return Math.floor(pageHeight / this.itemHeight());
};

Window_RecList.prototype.drawItem = function (index) {
  var rec_cg = rngd_recollection_mode_settings.rec_cg_set[index + 1];
  var rect = this.itemRect(index);
  var text_height = 0;
  if (rngd_recollection_mode_settings.rec_list_window.show_title_text) {
    if (this._global_variables["switches"][rec_cg.switch_id]) {
      this.contents.drawText(
        rec_cg.title,
        rect.x + 4,
        rect.y + 4,
        this.itemWidth(),
        32,
        rngd_recollection_mode_settings.rec_list_window.title_text_align
      );
    } else {
      this.contents.drawText(
        rngd_recollection_mode_settings.rec_list_window.never_watch_title_text,
        rect.x + 4,
        rect.y + 4,
        this.itemWidth(),
        32,
        rngd_recollection_mode_settings.rec_list_window.title_text_align
      );
    }
    text_height = 32;
  }

  // CGセットのスイッチ番号が、全てのセーブデータを走査した後にTrueであればピクチャ表示
  if (this._global_variables["switches"][rec_cg.switch_id]) {
    var thumbnail_file_name = rec_cg.pictures[0];
    if (rec_cg.thumbnail !== undefined && rec_cg.thumbnail !== null) {
      thumbnail_file_name = rec_cg.thumbnail;
    }

    this.drawRecollection(
      thumbnail_file_name,
      0,
      0,
      this.itemWidth() - 36,
      this.itemHeight() - 8 - text_height,
      rect.x + 16,
      rect.y + 4 + text_height
    );
  } else {
    this.drawRecollection(
      rngd_recollection_mode_settings.rec_list_window.never_watch_picture_name,
      0,
      0,
      this.itemWidth() - 36,
      this.itemHeight() - 8 - text_height,
      rect.x + 16,
      rect.y + 4 + text_height
    );
  }
};

//-------------------------------------------------------------------------
// ● 全てのセーブデータを走査し、対象のシーンスイッチ情報を取得する
//-------------------------------------------------------------------------
Window_RecList.prototype.get_global_variables = function () {
  this._global_variables = {
    switches: {},
  };
  var maxSaveFiles = DataManager.maxSavefiles();
  for (var i = 1; i <= maxSaveFiles; i++) {
    if (DataManager.loadGameSwitch(i)) {
      var rec_cg_max = rngd_hash_size(
        rngd_recollection_mode_settings.rec_cg_set
      );

      for (var j = 0; j < rec_cg_max; j++) {
        var cg = rngd_recollection_mode_settings.rec_cg_set[j + 1];
        if ($gameSwitches._data[cg.switch_id]) {
          this._global_variables["switches"][cg.switch_id] = true;
        }
      }
    }
  }
};
//-------------------------------------------------------------------------
// ● index番目に表示された回想orCGが有効かどうか判断する
//-------------------------------------------------------------------------
Window_RecList.prototype.is_valid_picture = function (index) {
  // CG情報の取得と対象スイッチの取得
  var _rec_cg_obj = rngd_recollection_mode_settings.rec_cg_set[index];
  return this._global_variables["switches"][_rec_cg_obj.switch_id] == true;
};

(function () {
  //-----------------------------------------------------------------------------
  // ◆ 組み込み関数Fix
  //-----------------------------------------------------------------------------

  Window_Base.prototype.drawRecollection = function (
    bmp_name,
    x,
    y,
    width,
    height,
    dx,
    dy
  ) {
    var bmp = ImageManager.loadPicture(bmp_name);

    var _width = width;
    var _height = height;
    if (_width > bmp.width) {
      _width = bmp.width - 1;
    }

    if (_height > bmp.height) {
      _height = bmp.height - 1;
    }
    this.contents.blt(bmp, x, y, _width, _height, dx, dy);
  };

  var Window_TitleCommand_makeCommandList =
    Window_TitleCommand.prototype.makeCommandList;

  Window_TitleCommand.prototype.makeCommandList = function () {
    Window_TitleCommand_makeCommandList.call(this);
    this.clearCommandList();
    this.addCommand(TextManager.newGame, "newGame");
    this.addCommand(
      TextManager.continue_,
      "continue",
      this.isContinueEnabled()
    );
    this.addCommand(
      rngd_recollection_mode_settings.rec_mode_window.recollection_title,
      "recollection"
    );
    this.addCommand(TextManager.options, "options");
  };

  Scene_Title.prototype.commandRecollection = function () {
    SceneManager.push(Scene_Recollection);
  };

  var Scene_Title_createCommandWindow =
    Scene_Title.prototype.createCommandWindow;
  Scene_Title.prototype.createCommandWindow = function () {
    Scene_Title_createCommandWindow.call(this);
    this._commandWindow.setHandler(
      "recollection",
      this.commandRecollection.bind(this)
    );
  };

  // セーブデータ共有オプションが指定されている場合のみ、カスタマイズ
  if (rngd_recollection_mode_settings["share_recollection_switches"]) {
    DataManager.makeSaveContents = function () {
      // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.

      Scene_Recollection.setRecollectionSwitches();

      var contents = {};
      contents.system = $gameSystem;
      contents.screen = $gameScreen;
      contents.timer = $gameTimer;
      contents.switches = $gameSwitches;
      contents.variables = $gameVariables;
      contents.selfSwitches = $gameSelfSwitches;
      contents.actors = $gameActors;
      contents.party = $gameParty;
      contents.map = $gameMap;
      contents.player = $gamePlayer;

      return contents;
    };

    DataManager.extractSaveContents = function (contents) {
      $gameSystem = contents.system;
      $gameScreen = contents.screen;
      $gameTimer = contents.timer;
      $gameSwitches = contents.switches;
      $gameVariables = contents.variables;
      $gameSelfSwitches = contents.selfSwitches;
      $gameActors = contents.actors;
      $gameParty = contents.party;
      $gameMap = contents.map;
      $gamePlayer = contents.player;

      Scene_Recollection.setRecollectionSwitches();
    };

    DataManager.setupNewGame = function () {
      this.createGameObjects();
      Scene_Recollection.setRecollectionSwitches();
      this.selectSavefileForNewGame();
      $gameParty.setupStartingMembers();
      $gamePlayer.reserveTransfer(
        $dataSystem.startMapId,
        $dataSystem.startX,
        $dataSystem.startY
      );
      Graphics.frameCount = 0;
    };
  }

  //-----------------------------------------------------------------------------
  // ◆ DataManager関数
  //-----------------------------------------------------------------------------

  //-------------------------------------------------------------------------
  // ● スイッチのみロードする
  //-------------------------------------------------------------------------
  DataManager.loadGameSwitch = function (savefileId) {
    try {
      return this.loadGameSwitchWithoutRescue(savefileId);
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  DataManager.loadGameSwitchWithoutRescue = function (savefileId) {
    var globalInfo = this.loadGlobalInfo();
    if (this.isThisGameFile(savefileId)) {
      var json = StorageManager.load(savefileId);
      this.createGameObjectSwitch();
      this.extractSaveContentsSwitches(JsonEx.parse(json));
      //this._lastAccessedId = savefileId;
      return true;
    } else {
      return false;
    }
  };

  DataManager.createGameObjectSwitch = function () {
    $gameSwitches = new Game_Switches();
  };

  DataManager.extractSaveContentsSwitches = function (contents) {
    $gameSwitches = contents.switches;
  };
})();
