@echo off
chcp 65001 >nul

set VAULT_WEB=D:\BaiduSyncdisk\黑曜石库\4.兴趣知识库\C-Garden-Web
set WEB=D:\C_Garden_Web

echo ==============================
echo Sync public Markdown
echo ==============================

robocopy "%VAULT_WEB%\发布" "%WEB%\content" /E /XD ".obsidian" ".git" "node_modules" /XF ".env" ".env.*" "*.base" "*.canvas"

echo ==============================
echo Sync public images
echo ==============================

robocopy "%VAULT_WEB%\公开附件\images" "%WEB%\content\images" /E /XF ".env" ".env.*"

echo ==============================
echo Sync public files
echo ==============================

robocopy "%VAULT_WEB%\公开附件\files" "%WEB%\content\files" /E /XF ".env" ".env.*"

echo ==============================
echo Done.
echo ==============================

pause
