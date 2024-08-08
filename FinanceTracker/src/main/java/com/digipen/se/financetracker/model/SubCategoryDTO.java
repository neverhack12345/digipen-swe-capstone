package com.digipen.se.financetracker.model;

import lombok.Data;

@Data
public class SubCategoryDTO {
    public static final int MAX_CHARACTERS = 255;
    private int subId;
    private String subName;
    private String catName;
    public SubCategoryDTO(int subId, String subName, String catName) {
        this.subId = subId;
        this.subName = subName;
        this.catName = catName;
    }
}
