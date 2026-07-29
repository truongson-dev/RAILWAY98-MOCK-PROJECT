package com.vti.ProductManagement.dto;

import java.time.LocalDate;

public class InventoryDTO {

	private Long id;
	private Long productId;
	private Double quantity;
	private Double minStockLevel;
	private LocalDate harvestDate;
	private LocalDate expiryDate;
	private String message;

	public InventoryDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public InventoryDTO(Long id, Long productId, Double quantity, Double minStockLevel, LocalDate harvestDate,
			LocalDate expiryDate) {
		super();
		this.id = id;
		this.productId = productId;
		this.quantity = quantity;
		this.minStockLevel = minStockLevel;
		this.harvestDate = harvestDate;
		this.expiryDate = expiryDate;

		if (quantity <= minStockLevel) {
			this.message = "tồn còn ít mời nhập thêm";
		} else {
			this.message = "Đủ hàng";
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	public Double getMinStockLevel() {
		return minStockLevel;
	}

	public void setMinStockLevel(Double minStockLevel) {
		this.minStockLevel = minStockLevel;
	}

	public LocalDate getHarvestDate() {
		return harvestDate;
	}

	public void setHarvestDate(LocalDate harvestDate) {
		this.harvestDate = harvestDate;
	}

	public LocalDate getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(LocalDate expiryDate) {
		this.expiryDate = expiryDate;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
