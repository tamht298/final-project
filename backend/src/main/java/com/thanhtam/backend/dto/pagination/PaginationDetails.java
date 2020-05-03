package com.thanhtam.backend.dto.pagination;

import lombok.Data;
import org.springframework.data.domain.Page;

@Data
public class PaginationDetails {
    private Long totalCount;

    private Integer totalPage;

    private Integer pageCount;

    private Integer pageNumber;

    private NextPage nextPage;

    private PreviousPage previousPage;

    private Boolean isFirstPage;

    private Boolean isLastPage;

    public PaginationDetails(Page page) {
        this.totalCount = page.getTotalElements();
        this.pageCount = page.getNumberOfElements();
        this.pageNumber = page.getNumber();
        this.isFirstPage = page.isFirst();
        this.isLastPage = page.isLast();
        this.nextPage = new NextPage(page);
        this.previousPage = new PreviousPage(page);
        this.totalPage = page.getTotalPages();
    }
}
