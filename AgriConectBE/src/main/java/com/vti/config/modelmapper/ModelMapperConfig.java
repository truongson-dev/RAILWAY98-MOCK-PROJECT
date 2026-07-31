package com.vti.config.modelmapper;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.vti.ProductManagement.dto.InventoryDTO;
import com.vti.ProductManagement.entity.Inventory;
import com.vti.ProductManagement.entity.Product;
import com.vti.ProductManagement.form.ProductFormForCreating;

@Configuration
public class ModelMapperConfig {

	@Bean
	public ModelMapper modelMapper() {
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

		mapper.addMappings(new PropertyMap<Inventory, InventoryDTO>() {
			@Override
			protected void configure() {
				map().setProductId(source.getProductId().getId());
			}
		});

		mapper.typeMap(ProductFormForCreating.class, Product.class).addMappings(m -> {
			m.skip(Product::setId);
		});

		return mapper;
	}

}
