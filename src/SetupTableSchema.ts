import connect from './database/connection';

const SQL = `CREATE TABLE users (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
email VARCHAR(50),
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;
const CreateTables = () => {
  const con = connect();
  con.connect((err: any) => {
    if (err) {
      throw err;
    }
    console.log('table creation connected!');
  });

  con.query(SQL, function (error, results, fields) {
    if (error) throw error;
    console.log('Tables created');
  });
  con.end();
};
CreateTables();
