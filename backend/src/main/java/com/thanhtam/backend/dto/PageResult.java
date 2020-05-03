package com.thanhtam.backend.dto;

import com.thanhtam.backend.dto.pagination.PaginationDetails;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
public class PageResult {
    private List<Object> data;

    private PaginationDetails paginationDetails;

    public PageResult(Page page) {
        this.data = page.getContent();
        paginationDetails = new PaginationDetails(page);
    }
}
