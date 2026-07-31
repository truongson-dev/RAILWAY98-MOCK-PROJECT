package com.vti.ProductManagement.specification;

import org.jspecify.annotations.Nullable;
import org.springframework.data.jpa.domain.Specification;

import com.vti.ProductManagement.entity.Product;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class ProductSpecification implements Specification<Product> {

	private String field;
	private String operator;
	private Object value;

	public ProductSpecification(String field, String operator, Object value) {
		super();
		this.field = field;
		this.operator = operator;
		this.value = value;
	}

	@Override
	public @Nullable Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query,
			CriteriaBuilder criteriaBuilder) {
		if (operator.equalsIgnoreCase("LIKE")) {
			return criteriaBuilder.like(root.get(field).as(String.class), "%" + value.toString() + "%");
		} else if (operator.equalsIgnoreCase("=")) {
			return criteriaBuilder.equal(root.get(field), value);
		}

		return null;
	}

}
