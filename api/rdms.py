import pyodbc

# --------------------------------------------------------------
# RDMS credentials 

# Removed for confidentiality
# --------------------------------------------------------------

# Connection string with Always Encrypted enabled
conn_str = (f'DRIVER={{ODBC Driver 18 for SQL Server}};'
            f'SERVER={server};'
            f'DATABASE={database};'
            f'UID={username};'
            f'PWD={password};'
            f'ColumnEncryption=Enabled;')

def add_user_row(primary_addr, prefund_addr):
    data = (primary_addr, prefund_addr)

    sql = f"""
    INSERT INTO [{table}] (PrimaryWallet, PrefundWallet) 
    VALUES (?, ?);
    """

    try:
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                cursor.execute(sql, data)
                conn.commit()
                print("Data inserted successfully.")
    except pyodbc.Error as e:
        print("An error occurred:", e)

def retrieve_user_id_from_prim_addr(primary_addr):
    ret = dict()
    # Executing sql query
    try:
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                cursor.execute(f"SELECT * FROM {table} where PrimaryWallet = '{primary_addr}'")
                for row in cursor:
                    ret = {
                        "userID": row[0],
                        "primaryWallet": row[1],
                        "prefundWallet": row[2]
                    }
    except pyodbc.Error as e:
        print("An error occurred:", e)

    return ret
