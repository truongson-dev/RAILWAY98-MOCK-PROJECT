package com.vti.ProductManagement.backend.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.vti.AccountManagement.backend.repository.IAccountRepository;
import com.vti.AccountManagement.entity.Account;
import com.vti.ProductManagement.backend.repository.ICategoryRepository;
import com.vti.ProductManagement.backend.repository.IInventoryRepository;
import com.vti.ProductManagement.backend.repository.IProductRepository;
import com.vti.ProductManagement.entity.Category;
import com.vti.ProductManagement.entity.Inventory;
import com.vti.ProductManagement.entity.Product;
import com.vti.ProductManagement.form.ProductFormForCreating;
import com.vti.ProductManagement.specification.ProductSpecification;

@Service
public class ProductService implements IProductService {

	@Autowired
	private IProductRepository productRepository;

	@Autowired
	private ICategoryRepository categoryRepository;

	@Autowired
	private IAccountRepository accountRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private IInventoryRepository inventoryRepository;

	@Override
	public Page<Product> getAllProduct(Pageable pageable, String search) {
		Specification<Product> where = null;

		if (!StringUtils.isEmpty(search)) {
			ProductSpecification nameSpecification = new ProductSpecification("name", "LIKE", search);

			// Kiểm tra nếu search là số thì tìm theo id, không thì chỉ tìm theo name
			try {
				Long searchId = Long.parseLong(search);
				ProductSpecification idSpecification = new ProductSpecification("id", "=", searchId);
				where = Specification.where(idSpecification).or(nameSpecification);
			} catch (NumberFormatException e) {
				where = Specification.where(nameSpecification);
			}
		}

		return productRepository.findAll(where, pageable);
	}

	@Override
	public Inventory findInventoryByProductId(Long productId) {
		return inventoryRepository.findByProductId(productId);
	}

	@Override
	public Inventory updateInventory(Long productId, Double quantity, Double minStockLevel) {
		Inventory inventory = inventoryRepository.findByProductId(productId);

		if (inventory == null) {
			return null;
		}

		if (quantity != null) {
			inventory.setQuantity(quantity);
		}
		if (minStockLevel != null) {
			inventory.setMinStockLevel(minStockLevel);
		}

		return inventoryRepository.save(inventory);
	}

	@Override
	public List<Inventory> getLowStockInventories() {
		return inventoryRepository.findLowStockInventories();
	}

	@Override
	public Product createProduct(ProductFormForCreating form) {
		// 1. ModelMapper tự động map các trường cơ bản (tên, giá, mô tả,...)
		Product product = modelMapper.map(form, Product.class);

		// 2. Lấy tham chiếu trực tiếp từ ID (không cần kiểm tra tồn tại)
		Category category = categoryRepository.getReferenceById(form.getCategoryId());
		Account seller = accountRepository.getReferenceById(form.getSellerId());

		// 3. Phải set thủ công Category và Seller vì kiểu dữ liệu khác nhau (Long ->
		// Entity)
		product.setCategoryId(category);
		product.setSellerId(seller);

		// 4. Lưu vào Database
		Product savedProduct = productRepository.save(product);

		// 5. Trả về dưới dạng DTO
		return modelMapper.map(savedProduct, Product.class);
	}

	@Override
	public void deleteProduct(Long id) {
		// Kiểm tra xem sản phẩm có tồn tại hay không trước khi xóa (tùy chọn nhưng an
		// toàn)
		if (!productRepository.existsById(id)) {
			throw new RuntimeException("Không tìm thấy sản phẩm có ID: " + id);
		}
		productRepository.deleteById(id);

	}

	@Override
	public ByteArrayInputStream exportProductsToExcel() {
		List<Product> products = productRepository.findAll();

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
			Sheet sheet = workbook.createSheet("Products");

			// Tạo dòng tiêu đề (Header)
			Row headerRow = sheet.createRow(0);
			String[] columns = { "ID", "Tên sản phẩm", "Mô tả", "Giá", "Đơn vị", "Trạng thái" };
			for (int i = 0; i < columns.length; i++) {
				Cell cell = headerRow.createCell(i);
				cell.setCellValue(columns[i]);
			}

			// Đổ dữ liệu sản phẩm vào các dòng tiếp theo
			int rowIdx = 1;
			for (Product product : products) {
				Row row = sheet.createRow(rowIdx++);
				row.createCell(0).setCellValue(product.getId());
				row.createCell(1).setCellValue(product.getName());
				row.createCell(2).setCellValue(product.getDescription());
				row.createCell(3).setCellValue(product.getPrice() != null ? product.getPrice().doubleValue() : 0.0);
				row.createCell(4).setCellValue(product.getUnit());
				row.createCell(5).setCellValue(product.getStatus() != null ? product.getStatus().toString() : "");
			}

			workbook.write(out);
			return new ByteArrayInputStream(out.toByteArray());
		} catch (IOException e) {
			throw new RuntimeException("Lỗi khi xuất file Excel: " + e.getMessage());
		}
	}

}
