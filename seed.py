import pymysql

conn = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='agriconnect_db'
)

cursor = conn.cursor()

print("Bắt đầu insert categories...")
cats = [
    (1, 'Trái cây ăn quả', 'Fruits', 'Các loại trái cây tươi'),
    (2, 'Cây công nghiệp', 'Industrial Crops', 'Cà phê, tiêu, điều...'),
    (3, 'Lúa gạo & Lương thực', 'Rice & Grains', 'Lúa gạo và các loại ngũ cốc'),
    (4, 'Rau củ quả sạch', 'Vegetables', 'Rau củ hữu cơ, an toàn')
]

for cat in cats:
    cursor.execute("INSERT INTO categories (id, name, name_en, description) VALUES (%s, %s, %s, %s)", cat)

print("Bắt đầu insert tài khoản mẫu...")
# Chuỗi hash bcrypt tương ứng với mật khẩu '123456'
bcrypt_123456 = "$2a$10$L1bYV.R7UqSxzE.h2rV8v.jB6h/D0uW9J4X1Z2y3p4q5r6s7t8u9" 

# Cứ dùng INSERT INTO, tạo 1 tài khoản Supplier mẫu
cursor.execute("""
    INSERT INTO accounts (email, password, full_name, role, status) 
    VALUES ('nongdan.test@gmail.com', %s, 'Nông Trại Hữu Cơ Test', 'SUPPLIER', 'ACTIVE')
""", (bcrypt_123456,))

# Lấy ID của tài khoản vừa tạo để gán cho Product
supplier_id = cursor.lastrowid

print(f"Bắt đầu insert sản phẩm mẫu cho Supplier ID = {supplier_id}...")
products = [
    ('Xoài Cát Hòa Lộc', 65000.0, 'kg', 1, supplier_id, 'Đồng Tháp'),
    ('Hạt Tiêu Đen', 120000.0, 'kg', 2, supplier_id, 'Gia Lai'),
    ('Gạo Lứt Huyết Rồng', 45000.0, 'kg', 3, supplier_id, 'Long An')
]

for prod in products:
    cursor.execute("""
        INSERT INTO products (name, price, unit, category_id, seller_id, location) 
        VALUES (%s, %s, %s, %s, %s, %s)
    """, prod)

conn.commit()
cursor.close()
conn.close()

print("Hoàn tất thêm dữ liệu mẫu bằng INSERT INTO!")
