const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
var multer = require("multer");
var upload = multer({ test: "upload/" });

let conn = mysql.createConnection({
  // 나의 DB 정보
  host: "project-db-stu.ddns.net",
  user: "jay",
  password: "jay1234",
  port: "3307",
  database: "jay",
});

router.post("/", () => {
  console.log("welcome to 백월드!!!! ");
});

router.post("/log", (req, res) => {
  console.log("로그인 페이지 라우터");
  let key = req.body.key;
  console.log("로그인 값 : ", key);

  let sql = "select * from t_admin where adm_key = ?";
  conn.query(sql, [key], function (err, rows) {
    if (rows.length > 0) {
      console.log("로그인 성공", rows[0].adm_key),
        res.json({
          key: rows[0].adm_key,
        });
    } else {
      console.log("로그인 값 안맞아요 in router", err);
    }
  });
});

router.post("/add", upload.single("photo"), function (req, res) {
  console.log("add 라우터 시작");
  console.log("이미지 뭐니??", req.file);
  let num = req.body.num;
  let lat = req.body.lat;
  let long = req.body.long;
  let location = req.body.loc;
  let photo;
  if (req.file != undefined) {
    photo = req.file.buffer;
  } else {
    photo = "";
  }
  let key = "123456";
  let tl_ai = "1";
  let tl_life = "1";

  let sql =
    "insert into tl_info(tl_lat,tl_long,tl_pic,tl_key,tl_name,tl_location,tl_ai,tl_life) values(?,?,?,?,?,?,?,?)";
  conn.query(
    sql,
    [lat, long, photo, key, num, location, tl_ai, tl_life],
    function (err, rows) {
      if (!err) {
        console.log("디비에 신호등 추가성공");
        res.redirect("http://localhost:3000/main-yoo1");
      } else {
        console.log("신호등 추가 실패 : ", err);
      }
    }
  );
});

// AIMODE ON
router.post("/aimode", function (req, res) {
  console.log("ai모드 시작");
  let sql;
  let tl_ai = req.body.tl_ai;
  let tl_name = req.body.tl_name;
  console.log("Aimode : ", tl_name);

  if (tl_ai == "1") {
    sql = 'update tl_info set tl_ai = "1" where tl_name = ?';
  } else if (tl_ai == "0") {
    sql = 'update tl_info set tl_ai = "0" where tl_name = ?';
  }

  conn.query(sql, [tl_name], function (err, rows) {
    if (!err) {
      console.log("ai모드 ", rows);
      res.json({ res: "업데이트" });
      // res.end();
    } else {
      console.log("ai모드 실패", err);
    }
  });
});

router.post("/police", (req, res) => {
  console.log("폴리스 라우터");
  let sql = "select offi_num,offi_name,offi_location,offi_phone from t_offices";
  conn.query(sql, (err, rows) => {
    if (rows.length > 0) {
      console.log("폴리스값 가져와짐");
      res.json({
        police: rows,
      });
    } else {
      console.log("폴리스 라우터 값 문제 : ", err);
    }
  });
});

router.post("/error", (req, res) => {
  console.log("에러 페이지 라우터");
  console.log(req.body.name);
  let name = req.body.name;
  let sql =
    "select i.tl_lat lat , i.tl_long tllong ,i.tl_name name, i.tl_location location,s.error_name as error, s.error_date as date,s.tl_error,s.tl_cnt as num from tl_info i inner join tl_state s on s.tl_error = i.tl_name where s.tl_error = ? order by num";
  conn.query(sql, [name], (err, rows) => {
    if (rows.length > 0) {
      console.log("에러DB 가져와짐");
      res.json({
        error: rows,
      });
    } else {
      console.log("에러db값 안가져와짐", err);
      throw err;
    }
  });
});

router.post("/all_error", (req, res) => {
  let sql =
    "select i.tl_lat lat , i.tl_long tllong ,i.tl_name name, i.tl_location location,s.error_name as error, s.error_date as date,s.tl_error,s.tl_cnt as num from tl_info i inner join tl_state s on s.tl_error = i.tl_name order by num";
  conn.query(sql, (err, rows) => {
    if (rows.length > 0) {
      res.json({
        error: rows,
      });
    } else {
      throw err;
    }
  });
});

router.post("/del", (req, res) => {
  console.log("에러 페이지 라우터");
  console.log(req.body.name);
  let name = req.body.name;
  let sql = "update tl_info set tl_life = '0' where tl_name = ?";
  conn.query(sql, [name], (err, rows) => {
    if (!err) {
      console.log("삭제 성공");
      res.json({
        suc: "삭제되었습니다.",
      });
    } else {
      console.log("삭제 실패입니다.", err);
      throw err;
    }
  });
});

router.post("/problem", (req, res) => {
  console.log("이상내역 오버레이 라우터");
  let title = req.body.title;
  console.log(title);
  let sql =
    "select error_name, error_date from tl_state where tl_error = ? order by error_date desc limit 1";
  conn.query(sql, [title], (err, rows) => {
    if (!err) {
      console.log("이상내역 가져오기 성공", rows);
      res.json({
        problem: rows,
      });
    } else {
      console.log("이상내역 가져오기 실패입니다 : ", err);
      throw err;
    }
  });
});

router.post("/main", (req, res) => {
  console.log("main라우터 접속");

  let sql =
    "select tl_lat,tl_long,tl_name,tl_location,tl_ai,tl_pic from tl_info where tl_life = '1'";
  let sql3 = "select * from t_offices";

  conn.query(sql, (err, row) => {
    conn.query(sql3, (err, rows3) => {
      if (rows3.length > 0) {
        console.log("tl_info정보 가져와짐 : ", rows3);
        res.json({
          tl_info: row,
          res1: rows3,
        });
      } else {
        console.log("tl_info정보 안가져와짐", err);
        throw err;
      }
    });
  });
});
module.exports = router;
