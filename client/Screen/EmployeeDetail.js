import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, Alert, ToastAndroid } from 'react-native';
import { Header, Icon, Container, Left, Body, Title } from 'native-base';

class EmployeeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama:'',
            alamat:'',
            jabatan: '',
            gaji: '',
            listData: [],
            idEdit:null,
            isVisible: false,
            isVisible2: false
        };
        this.url = "https://server-buat-react.herokuapp.com/api.php";
    }

    componentDidMount() {
        this.ambilListData();
    }

    async ambilListData(){
    await fetch(this.url)
    .then((response)=>response.json())
    .then((json)=>{
        console.log('Hasil yang didapat: '+JSON.stringify(json.data.result));
        this.setState({listData:json.data.result});
    })
    .catch((error)=>{
        console.log(error);
    })
  }

    async displayModal(show, id){
        await fetch(this.url+"/?op=detail&id="+id)
        .then((response)=>response.json())
        .then((json)=>{
            this.setState({nama:json.data.result[0].nama});
            this.setState({alamat:json.data.result[0].alamat})
            this.setState({jabatan:json.data.result[0].jabatan})
            this.setState({gaji:json.data.result[0].gaji})
            this.setState({idEdit:id})
            this.setState({isVisible: show})
        })
    }

    async klikDetail(show, id){
        await fetch(this.url+"/?op=detail2&id="+id)
        .then((response)=>response.json())
        .then((json)=>{
            this.setState({nama:json.data.result[0].nama});
            this.setState({alamat:json.data.result[0].alamat})
            this.setState({jabatan:json.data.result[0].jabatan})
            this.setState({gaji:json.data.result[0].gaji})
            this.setState({idEdit:id})
            this.setState({isVisible2: show})
        })
    }

    async klikDelete(id){
    await fetch(this.url+"/?op=delete&id="+id)
    .then((response)=>response.json())
    .then((json)=>{
        alert('Data berhasil didelete');
        this.ambilListData();
    })
    .catch((error)=>{
        console.log(error)
    })
  }

  async klikEdit(){
    if(this.state.nama == '' || this.state.alamat == '' || this.state.jabatan == '' || this.state.gaji == ''){
        alert('Silahkan diisi semua');
    }else{
        var urlAksi = this.url+"/?op=update&id="+this.state.idEdit;
        await fetch(urlAksi,{
            method:'post',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body:"nama="+this.state.nama+"&alamat="+this.state.alamat+"&jabatan="+this.state.jabatan+"&gaji="+this.state.gaji
        })
        .then((response) => response.json())
        .then((json) => {
                this.setState({nama:''});
                this.setState({alamat:''});
                this.setState({jabatan:''});
                this.setState({gaji:''});
                this.ambilListData();
          })
          ToastAndroid.show('Data berhasil diubah', ToastAndroid.SHORT, ToastAndroid.CENTER)
      }
  }

  render() {
      if(this.state.listData == null) {
          return (
              <Container>
                <Header style={{backgroundColor: '#ACF8FF'}} transparent>
                    <Left>
                        <TouchableOpacity
                        onPress={() => {this.props.navigation.replace('DrawerNavigationRoutes')}}>
                            <Icon name='arrow-back' style={{color: '#296F63'}} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{fontSize: 26, fontStyle: 'normal', color: '#296F63', fontWeight: 'bold'}}>Daftar Pegawai</Text>
                    </Body>
                </Header>
                <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                    <Text style={{color: '#296F63', fontWeight: 'bold', fontSize: 26}}>Data pegawai kosong</Text>
                </View>
              </Container>
          )
      }
      return (
          <Container>
            <Header style={{backgroundColor: '#ACF8FF'}} transparent>
                <Left>
                    <TouchableOpacity
                    onPress={() => {this.props.navigation.replace('DrawerNavigationRoutes')}}>
                        <Icon name='arrow-back' style={{color: '#296F63'}} />
                    </TouchableOpacity>
                </Left>
                <Body>
                    <Text style={{fontSize: 26, fontStyle: 'normal', color: '#296F63', fontWeight: 'bold'}}>Daftar Pegawai</Text>
                </Body>
            </Header>
            <View>
                <Modal
                    animationType= {'slide'}
                    transparent={false}
                    visible={this.state.isVisible}
                >
                    <View style={style.viewWrapper}>
                        <View style={style.viewForm}>
                            <TextInput 
                                style={style.textInput1}
                                placeholder="Masukkan Nama"
                                value={this.state.nama}
                                onChangeText={(text)=>this.setState({nama:text})}
                            >
                            </TextInput>
                            <TextInput
                                style={style.textInput2}
                                placeholder="Masukkan Alamat"   
                                value={this.state.alamat}
                                onChangeText={(text)=>this.setState({alamat:text})} 
                            ></TextInput>
                            <TextInput
                                style={style.textInput2}
                                placeholder="Jabatan"   
                                value={this.state.jabatan}
                                onChangeText={(text)=>this.setState({jabatan:text})} 
                            ></TextInput>
                            <TextInput
                                style={style.textInput2}
                                placeholder="Gaji"   
                                value={this.state.gaji}
                                onChangeText={(text)=>this.setState({gaji:text})} 
                            ></TextInput>
                            <TouchableOpacity 
                                style={style.button1}
                                onPress={()=>this.klikEdit()}>
                                <Text style={{color: 'white', textAlign: 'center', marginTop: 10.5}}>Ubah Data</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={style.button2}
                                onPress={()=> {this.displayModal(!this.state.isVisible, this.state.idEdit)}}>
                                <Text style={{color: 'white', textAlign: 'center', marginTop: 10.5}}>Kembali</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType= {'slide'}
                    transparent={false}
                    visible={this.state.isVisible2}
                >
                    <View style={style.viewWrapper}>
                        <View style={style.viewForm}>
                            <Text style={style.text1}>Nama : </Text>
                            <Text
                                style={style.textInput2}
                            >
                                {this.state.nama}
                            </Text>
                            <Text style={style.text2}>Alamat : </Text>
                            <Text
                                style={style.textInput2} 
                            >
                                {this.state.alamat}
                            </Text>
                            <Text style={style.text2}>jabatan : </Text>
                            <Text
                                style={style.textInput2} 
                            >
                                {this.state.jabatan}
                            </Text>
                            <Text style={style.text2}>Gaji : </Text>
                            <Text
                                style={style.textInput2}
                            >
                                {this.state.gaji}
                            </Text>
                            <TouchableOpacity 
                                style={style.button2}
                                onPress={()=> {this.klikDetail(!this.state.isVisible2, this.state.idEdit)}}>
                                <Text style={{color: 'white', textAlign: 'center', marginTop: 10.5}}>Kembali</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {
                    this.state.listData.map((val,index)=>(
                        <View style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1, 
                            borderBottomColor: '#162345',
                            marginLeft: '2.93%',
                            marginRight: '0.53%',
                            padding: 5,
                            }} key={index}>

                            <Text 
                                style={{
                                    flex: 2,
                                    fontFamily: 'Nunito', 
                                    fontSize: 18,
                                }}
                                onPress={() => {this.klikDetail(true, val.id)}}
                            >
                                {val.nama}
                            </Text>

                            <Text 
                                style={{
                                    marginRight: 4,
                                    padding: 10,
                                    backgroundColor: '#ACF8FF',
                                    borderRadius: 6
                                }}
                                onPress= { () => {this.displayModal(true, val.id)} }
                            >Edit</Text>

                            <Text 
                                style={{
                                    padding: 10,
                                    backgroundColor: '#ACF8FF',
                                    borderRadius: 6
                                }}
                                onPress={ 
                                    () => {
                                    Alert.alert(
                                        'Hapus',
                                        'Apakah anda yakin ingin menghapusnya?',
                                        [
                                            {
                                            text: 'Tidak',
                                            onPress: () => {
                                                return null;
                                            },
                                            },
                                            {
                                            text: 'Ya',
                                            onPress: () => {
                                                this.klikDelete(val.id);
                                            },
                                            },
                                        ],
                                        {cancelable: false},
                                    );
                                } }
                            >Delete</Text>
                        </View>
                    ))
                }
            </View>
          </Container>
      )
  }
}

const style = StyleSheet.create({
    viewWrapper:{
        flex:1
    },
    viewForm:{
        flex:2, 
        marginTop: 10,
        backgroundColor: '#F5FCFE',
        borderRadius: 30
    },
    textInput1:{
        marginTop: 40,
        marginLeft: '5.53%',
        marginRight: '5.53%',
        padding:10,
        fontSize:15,
        borderRadius:31.5,
        marginBottom:10,
        backgroundColor:'#F5F4F2'
    },
    text1: {
        marginTop: 40,
        marginLeft: '5.53%',
        marginRight: '5.53%',
        padding:10,
        fontSize:15,
        fontWeight: 'bold'
    },
    textInput2:{
        marginTop: 15,
        marginLeft: '5.53%',
        marginRight: '5.53%',
        padding:10,
        fontSize:15,
        borderRadius:31.5,
        marginBottom:10,
        backgroundColor:'#F5F4F2'
    },
    text2: {
        marginLeft: '5.53%',
        marginRight: '5.53%',
        padding:10,
        fontSize:15,
        fontWeight: 'bold'
    },
    button1: {
        marginTop: 15,
        marginLeft: '5.53%',
        marginRight: '5.53%',
        backgroundColor: '#296F63',
        borderRadius: 31.5,
        height: 43.64
    },
    button2: {
        marginTop: 15,
        marginLeft: '5.53%',
        marginRight: '5.53%',
        backgroundColor: 'red',
        borderRadius: 31.5,
        height: 43.64
    }
})

export default EmployeeDetail;