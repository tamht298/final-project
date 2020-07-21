package com.thanhtam.backend.dto.pagination;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Data
public class PreviousPage {
    private Integer pageNumber;

    @JsonProperty("available")
    private boolean hasPrevious;

    public PreviousPage(Page page) {

        this.hasPrevious = page.hasPrevious();
        if (page.hasPrevious()) {
            Pageable previousPage = page.previousPageable();
            this.pageNumber = previousPage.getPageNumber();
        }
    }
}
