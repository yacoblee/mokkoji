package com.example.mokkoji_backend.service;

import com.example.mokkoji_backend.entity.Code;
import com.example.mokkoji_backend.entity.CodeId;

import java.util.List;

public interface CodeService {
	public List<Code> selectList();
	public List<Code> selectPCList();
	public List<Code> selectPSList();
	public List<Code> selectPIList();
	public List<Code> selectRSList();
	public Code selectOne(CodeId id);
	public void save(Code entity);
	public void delete(CodeId id);
}
