using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{
    string conString = ConfigurationManager.ConnectionStrings["LIVEDNS"].ConnectionString;
    SqlConnection con = null;
    SqlCommand com = null;
    public WebService()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent();     
    }

    [WebMethod]

    public string Login(string Email, string Password)
    {

        User u = null;
        con = new SqlConnection(conString);


        try
        {


            com = new SqlCommand($"SELECT * FROM Users WHERE email='{Email}' AND userPass='{Password}'", con);

            com.Connection.Open();

            SqlDataReader reader = com.ExecuteReader();
            if (reader.Read())
            {
                u = new User()
                {
                    ID = int.Parse(reader["ID"].ToString()),
                    firstName = (reader["firstName"].ToString()),
                    lastName = (reader["lastName"].ToString()),
                    email = (reader["email"].ToString()),
                    userPass = (reader["userPass"].ToString())

                };
            }

            return new JavaScriptSerializer().Serialize(u); // to JSON

        }
        catch (Exception e)
        {
            return e.Message;

        }
        finally
        {
            if (com.Connection.State != ConnectionState.Closed)
            {
                com.Connection.Close();
            }
        }



    }


    [WebMethod]
    public string Regsiter(string FirstName, string LastName, string Email, string Password)
    {
        string userOutput = null;

        try
        {
            User newUser = null;
            SqlConnection con = new SqlConnection(conString);
            com = new SqlCommand($"SELECT * FROM Users WHERE email='{Email}' ", con);
            com.Connection.Open();
            SqlDataReader reader = com.ExecuteReader();
            if (reader.Read())
            {
                return new JavaScriptSerializer().Serialize(null);

            }
            else
            {
                if (com.Connection.State != ConnectionState.Closed)
                {
                    com.Connection.Close();
                }

                com = new SqlCommand($" INSERT  into Users (firstName,lastName,email,userPass) VALUES ('{FirstName}','{LastName }','{Email}','{Password}')", con);
                com.Connection.Open();
                int res = com.ExecuteNonQuery();
                if (res == 1)
                {
                    SqlCommand com2 = new SqlCommand($" SELECT max(ID) as MaxID from Users", con);

                    SqlDataReader reader1 = com2.ExecuteReader();
                    if (reader1.Read())
                    {
                        newUser = new User()
                        {
                            ID = (int)reader1["MaxID"],
                            firstName = FirstName,
                            lastName = LastName,
                            email = Email,
                            userPass = Password,
                        };

                    }
                    con.Close();
                    return new JavaScriptSerializer().Serialize(newUser);
                }

            }


        }

        catch (Exception e)
        {
            return e.Message;
        }
        finally
        {
            if (com.Connection.State != System.Data.ConnectionState.Closed)
            {
                com.Connection.Close();
            }
        }
        return userOutput;
    }


    [WebMethod]
    public List<Luz> Detail(string city)
    {
        List<Luz> details = new List<Luz>();
        con = new SqlConnection(conString);
        com = new SqlCommand();
        com.Connection = con;
        com.CommandText = $"select * from Luz where City='{city}'";
        SqlDataReader reader = null;
        com.Connection.Open();
        reader = com.ExecuteReader();
        while (reader.Read())
        {
            Luz d = new Luz()
            {
                Num = reader["Num"].ToString(),
                City = reader["City"].ToString(),
                Date = (DateTime)reader["Date"],
                Text = reader["Text"].ToString(),
            };
            details.Add(d);
        }
        return details;
    }

    [WebMethod]

    public int MapPage(string cityName, string Username)
    {
        int myCode = -1;
        SqlDataReader reader = null;
        con = new SqlConnection(conString);
        com = new SqlCommand();
        com.Connection = con;
        com.CommandText = $"SELECT cityCode FROM Cities WHERE cityName = '{cityName}'";
        com.Connection.Open();
        reader = com.ExecuteReader();
        if (reader.Read())
        {
            myCode = int.Parse(reader["cityCode"].ToString());
            reader.Close();
            SqlCommand com2 = new SqlCommand($"UPDATE Users SET cityCode= '{myCode}' WHERE  email= '{Username}'", con);
            com2.ExecuteNonQuery();

        }
        con.Close();
        return myCode;


    }
}
public class User
{
    public int ID { get; set; }
    public string firstName { get; set; }
    public string lastName { get; set; }
    public string email { get; set; }
    public int cityCode { get; set; }
    public int neighCode { get; set; }
    public string userPass { get; set; }
}

public class Luz
{
    public string Num { get; set; }
    public string City { get; set; }
    public DateTime Date { get; set; }
    public string Text { get; set; }
}
