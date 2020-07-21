package com.thanhtam.backend.service;

import com.thanhtam.backend.dto.UserExport;
import com.thanhtam.backend.entity.Intake;
import com.thanhtam.backend.entity.Profile;
import com.thanhtam.backend.entity.Role;
import com.thanhtam.backend.entity.User;
import com.thanhtam.backend.repository.UserRepository;
import com.thanhtam.backend.ultilities.ERole;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class ExcelServiceImpl implements ExcelService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ExcelServiceImpl.class);
    private final Path root = Paths.get("uploads");
    private FilesStorageService filesStorageService;
    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private RoleService roleService;
    private IntakeService intakeService;

    @Autowired
    public ExcelServiceImpl(FilesStorageService filesStorageService, PasswordEncoder passwordEncoder, UserRepository userRepository, RoleService roleService, IntakeService intakeService) {
        this.filesStorageService = filesStorageService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.intakeService = intakeService;
    }

    @Override
    public List<User> readUserFromExcelFile(String excelFilePath) throws IOException {
        List<User> userList = new ArrayList<>();
        FileInputStream inputStream = new FileInputStream(new File(excelFilePath));

        Workbook workBook = getWorkbook(inputStream, excelFilePath);
        Sheet firstSheet = workBook.getSheetAt(0);
        LOGGER.info(firstSheet.getSheetName());
        Iterator<Row> rows = firstSheet.iterator();

        while (rows.hasNext()) {
            Row row = rows.next();
            Iterator<Cell> cells = row.cellIterator();
            User user = new User();
            Profile profile = new Profile();

            while (cells.hasNext()) {
                Cell cell = cells.next();
                int columnIndex = cell.getColumnIndex();

                switch (columnIndex) {
                    case 0: {
                        user.setUsername((String) getCellValue(cell));
                        user.setPassword(passwordEncoder.encode((String) getCellValue(cell)));

                    }
                    break;

                    case 1: {
                        user.setEmail((String) getCellValue(cell));
                    }

                    break;
                    case 2: {
                        profile.setFirstName((String) getCellValue(cell));
                        user.setProfile(profile);

                    }

                    break;
                    case 3: {
                        profile.setLastName((String) getCellValue(cell));
                        user.setProfile(profile);

                    }

                    break;

                    case 4: {
                        Intake intake = intakeService.findByCode((String) getCellValue(cell));
                        user.setIntake(intake);
                    }
                    case 5: {
                        switch ((String) getCellValue(cell)) {
                            case "ADMIN": {
                                Role userRole = roleService.findByName(ERole.ROLE_ADMIN).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                                Set<Role> roles = new HashSet<>();
                                roles.add(userRole);
                                user.setRoles(roles);
                                break;
                            }

                            case "LECTURER": {
                                Role userRole = roleService.findByName(ERole.ROLE_LECTURER).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                                Set<Role> roles = new HashSet<>();
                                roles.add(userRole);
                                user.setRoles(roles);
                                break;
                            }

                            default: {
                                Role userRole = roleService.findByName(ERole.ROLE_STUDENT).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                                Set<Role> roles = new HashSet<>();
                                roles.add(userRole);
                                user.setRoles(roles);
                                break;
                            }
                        }
                    }
                    break;
                }

            }

            userList.add(user);
        }

        workBook.close();
        inputStream.close();
        LOGGER.error("List user: " + userList.toString());
        return userList;
    }

    @Override
    public void writeUserToExcelFile(ArrayList<UserExport> userExports) throws IOException {
        try (Workbook workbook = new XSSFWorkbook()) {
            String[] columns = {"Username", "Họ và tên", "Email"};
            Sheet sheet = workbook.createSheet("List of users");
            //Custom style
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setFontHeightInPoints((short) 14);
            headerFont.setColor(IndexedColors.RED.getIndex());

            // Create a CellStyle with the font
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);

            // Create a Row
            Row headerRow = sheet.createRow(0);

            // Create cells
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerCellStyle);
            }

            // Create Other rows and cells with employees data
            int rowNum = 1;
            for (UserExport user : userExports) {
                Row row = sheet.createRow(rowNum++);

                // Employee's name (Column A)
                row.createCell(0)
                        .setCellValue(user.getUsername());

                // Employee's email (Column B)
                row.createCell(1)
                        .setCellValue(user.getFirstName());

                row.createCell(2)
                        .setCellValue(user.getLastName());

                row.createCell(3)
                        .setCellValue(user.getEmail());
            }
            // Making size of column auto resize to fit with data
            sheet.autoSizeColumn(0);
            sheet.autoSizeColumn(1);
            sheet.autoSizeColumn(2);
            sheet.autoSizeColumn(3);
            FileOutputStream fileOut = new FileOutputStream("users.xlsx");

            workbook.write(fileOut);
            fileOut.close();

        } catch (IOException e) {
            e.printStackTrace();

        }

    }

    @Override
    public void InsertUserToDB(List<User> userList) {
        userList.forEach(user -> {
            if (userRepository.existsByEmailOrUsername(user.getEmail(), user.getUsername())) {
                try {
                    throw new Exception("Username or email has already existed");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                userRepository.save(user);
            }
        });

    }

    private Object getCellValue(Cell cell) {
        switch (cell.getCellType()) {
            case Cell.CELL_TYPE_STRING:
                return cell.getStringCellValue();

            case Cell.CELL_TYPE_BOOLEAN:
                return cell.getBooleanCellValue();

            case Cell.CELL_TYPE_NUMERIC:
                return cell.getNumericCellValue();
        }

        return null;
    }

    private Workbook getWorkbook(FileInputStream inputStream, String excelFilePath) throws IOException {
        Workbook workbook = null;

        if (excelFilePath.endsWith("xlsx")) {
            workbook = new XSSFWorkbook(inputStream);
        } else if (excelFilePath.endsWith("xls")) {
            workbook = new HSSFWorkbook(inputStream);
        } else {
            throw new IllegalArgumentException("The specified file is not Excel file");
        }

        return workbook;
    }
}
