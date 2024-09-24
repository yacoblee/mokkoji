package com.example.mokkoji_backend.service;

import java.util.List;

import com.example.mokkoji_backend.entity.Code;
import com.example.mokkoji_backend.entity.id.CodeId;

public interface CodeService {
	public List<Code> selectList();
	public List<Code> selectPCList();
	public Code selectOne(CodeId id);
	public void save(Code entity);
	public void delete(CodeId id);
}
