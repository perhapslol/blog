from flask import Flask, request, jsonify
import tushare as ts
import pandas as pd
import ssl

# 禁用SSL证书验证
ssl._create_default_https_context = ssl._create_unverified_context

app = Flask(__name__)

# Tushare token
TUSHARE_TOKEN = '9ea2fea30241423c23614ed2a210c87e3ad45eb2ed24986bdb95d1d7'

@app.route('/api/stock', methods=['GET'])
def get_stock_data():
    """
    获取股票财务数据
    参数: stock_code - 股票代码（6位数字）
    """
    stock_code = request.args.get('code')
    
    if not stock_code or len(stock_code) != 6:
        return jsonify({'error': '请输入有效的6位股票代码'}), 400
    
    try:
        # 初始化Tushare接口
        pro = ts.pro_api(TUSHARE_TOKEN)
        
        # 获取股票基本信息
        stock_info = pro.stock_basic(ts_code=stock_code+'.SZ', fields='ts_code,symbol,name,industry,list_date')
        
        if stock_info.empty:
            stock_info = pro.stock_basic(ts_code=stock_code+'.SH', fields='ts_code,symbol,name,industry,list_date')
        
        if stock_info.empty:
            return jsonify({'error': f'未找到股票代码 {stock_code} 的数据'}), 404
        
        stock_name = stock_info.iloc[0]['name']
        industry = stock_info.iloc[0]['industry']
        list_date = stock_info.iloc[0]['list_date']
        
        # 获取财务数据（最近5年）
        fina_data = pro.fina_indicator(ts_code=stock_code+'.SZ', start_date='20210101', end_date='20251231')
        
        if fina_data.empty:
            fina_data = pro.fina_indicator(ts_code=stock_code+'.SH', start_date='20210101', end_date='20251231')
        
        if fina_data.empty:
            return jsonify({'error': f'未找到股票 {stock_code} 的财务数据'}), 404
        
        # 整理数据
        result = {
            'name': stock_name,
            'code': stock_code,
            'industry': industry,
            'listing': list_date,
            'profit': {
                'rev': [],      # 营业总收入
                'op': [],       # 营业利润
                'pr': [],       # 利润总额
                'np': [],       # 净利润
                'pn': [],       # 归母公司净利润
                'dnp': [],      # 扣非净利润
                'rd': []        # 研发费用
            },
            'balance': {
                'ta': [],       # 总资产
                'tl': [],       # 总负债
                'eq': [],       # 净资产
                'peq': [],      # 归母公司权益
                'dr': []        # 资产负债率
            },
            'perShare': {
                'eps': [],      # 每股收益
                'bvps': [],     # 每股净资产
                'pcf': [],      # 每股现金流
                'urp': [],      # 每股未分配利润
                'ocfps': []     # 每股经营现金流
            },
            'ratio': {
                'roe': [],      # 净资产收益率
                'gm': [],       # 毛利率
                'om': [],       # 营业利润率
                'nm': []        # 净利率
            }
        }
        
        # 按年份排序
        fina_data = fina_data.sort_values(by='end_date')
        
        for _, row in fina_data.iterrows():
            year = row['end_date'][:4]
            result['profit']['rev'].append(f"{int(row.get('tr_yoy', 0)):,}")
            result['profit']['op'].append(f"{int(row.get('profit_yoy', 0)):,}")
            result['profit']['pr'].append(f"{int(row.get('profit_yoy', 0)):,}")
            result['profit']['np'].append(f"{int(row.get('net_profit', 0)):,}")
            result['profit']['pn'].append(f"{int(row.get('parent_netprofit', 0)):,}")
            result['profit']['dnp'].append(f"{int(row.get('profit_dedt', 0)):,}")
            result['profit']['rd'].append(f"{int(row.get('rd_exp', 0)):,}")
            
            result['balance']['ta'].append(f"{int(row.get('total_assets', 0)):,}")
            result['balance']['tl'].append(f"{int(row.get('total_liab', 0)):,}")
            result['balance']['eq'].append(f"{int(row.get('total_hldr_eqy_exc_min_int', 0)):,}")
            result['balance']['peq'].append(f"{int(row.get('parent_equity', 0)):,}")
            result['balance']['dr'].append(f"{row.get('debt_to_assets', 0):.2f}%")
            
            result['perShare']['eps'].append(f"{row.get('eps', 0):.2f}")
            result['perShare']['bvps'].append(f"{row.get('bps', 0):.2f}")
            result['perShare']['pcf'].append(f"{row.get('cfps', 0):.2f}")
            result['perShare']['urp'].append(f"{row.get('undist_profit_ps', 0):.2f}")
            result['perShare']['ocfps'].append(f"{row.get('ocfps', 0):.2f}")
            
            result['ratio']['roe'].append(f"{row.get('roe', 0):.2f}%")
            result['ratio']['gm'].append(f"{row.get('gross_margin', 0):.2f}%")
            result['ratio']['om'].append(f"{row.get('op_margin', 0):.2f}%")
            result['ratio']['nm'].append(f"{row.get('net_margin', 0):.2f}%")
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': f'获取数据失败: {str(e)}'}), 500

@app.route('/api/stock_list', methods=['GET'])
def get_stock_list():
    """
    获取股票列表（支持搜索）
    """
    keyword = request.args.get('keyword', '')
    
    try:
        pro = ts.pro_api(TUSHARE_TOKEN)
        
        if keyword:
            stocks = pro.stock_basic(
                name=keyword,
                fields='ts_code,symbol,name,industry,list_date'
            )
        else:
            stocks = pro.stock_basic(
                fields='ts_code,symbol,name,industry,list_date'
            ).head(100)
        
        result = []
        for _, row in stocks.iterrows():
            result.append({
                'code': row['symbol'],
                'name': row['name'],
                'industry': row['industry'],
                'list_date': row['list_date']
            })
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': f'获取股票列表失败: {str(e)}'}), 500

if __name__ == '__main__':
    print('Starting Flask server on http://0.0.0.0:7777')
    app.run(host='0.0.0.0', port=7777, debug=False, use_reloader=False)