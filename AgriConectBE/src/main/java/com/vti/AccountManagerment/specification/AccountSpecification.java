package com.vti.AccountManagerment.specification;

import org.jspecify.annotations.Nullable;
import org.springframework.data.jpa.domain.Specification;

import com.vti.AccountManagerment.entity.Account;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class AccountSpecification implements Specification<Account> {

	private String field;
	private String operator;
	private Object value;

	public AccountSpecification(String field, String operator, Object value) {
		super();
		this.field = field;
		this.operator = operator;
		this.value = value;
	}

	@Override
	public @Nullable Predicate toPredicate(Root<Account> root, CriteriaQuery<?> query,
			CriteriaBuilder criteriaBuilder) {
		if (operator.equalsIgnoreCase("LIKE")) {
			return criteriaBuilder.like(root.get(field).as(String.class), "%" + value.toString() + "%");
		}

		return null;
	}

}
