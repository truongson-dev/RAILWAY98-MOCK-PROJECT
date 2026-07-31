package com.vti.module.feedback.entity;


import com.vti.module.account.entity.Account;
import com.vti.module.product.entity.Product;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data

@Entity
@Table(name = "product_feedbacks")
public class ProductFeedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "order_id")
    private Long orderId;

    private Integer rating;
    private String comment;

    public Account getAccount() { return account; }
    public void setAccount(Account account) { this.account = account; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}
