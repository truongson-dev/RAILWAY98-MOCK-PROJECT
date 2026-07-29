import pymysql

conn = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='agriconnect_db'
)

cursor = conn.cursor()
cats = [
    (1, 'Trái cây ăn quả', 'Fruits', 'Các loại trái cây tươi'),
    (2, 'Cây công nghiệp', 'Industrial Crops', 'Cà phê, tiêu, điều...'),
    (3, 'Lúa gạo & Lương thực', 'Rice & Grains', 'Lúa gạo và các loại ngũ cốc'),
    (4, 'Rau củ quả sạch', 'Vegetables', 'Rau củ hữu cơ, an toàn')
]

for cat in cats:
    try:
        cursor.execute("INSERT IGNORE INTO categories (id, name, nameEn, description) VALUES (%s, %s, %s, %s)", cat)
    except Exception as e:
        print(f"Error: {e}")

conn.commit()
cursor.close()
conn.close()
print("Seed categories done!")
