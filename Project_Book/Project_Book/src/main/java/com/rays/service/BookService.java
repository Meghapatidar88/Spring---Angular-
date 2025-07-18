package com.rays.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Propagation;

import com.rays.dao.BookDAO;
import com.rays.dto.BookDTO;

@Service
@Transactional
public class BookService {

    @Autowired
    private BookDAO dao;

    @Transactional(propagation = Propagation.REQUIRED)
    public long add(BookDTO dto) {
        return dao.add(dto);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void update(BookDTO dto) {
        dao.update(dto);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void delete(long id) {
        try {
            BookDTO dto = findById(id);
            dao.delete(dto);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public BookDTO findById(long pk) {
        return dao.findByPk(pk);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public long save(BookDTO dto) {
        Long id = dto.getId();
        if (id != null && id > 0) {
            update(dto);
        } else {
            id = add(dto);
        }
        return id;
    }

    @Transactional(readOnly = true)
    public List<BookDTO> search(BookDTO dto, int pageNo, int pageSize) {
        return dao.search(dto, pageNo, pageSize);
    }

}
